import json
import os
import re
from os import path
from subprocess import call
from typing import List

from jinja2 import Environment, FileSystemLoader, Template, BaseLoader

from model import ApplicationModel

TEMPLATES_BASE_PATH = path.realpath(path.join(__file__, '../templates'))


class Generator(object):
    templates = []

    def __init__(self, template_type: str):
        self.templates = self._init_templates(template_type)

    def _init_templates(self, template_type='django-ninja') -> List[Template]:
        templates = []
        templates_base_path = os.path.join(TEMPLATES_BASE_PATH, template_type)
        env = Environment(loader=FileSystemLoader(templates_base_path))
        for directory, files in [(_dir, _files) for _dir, _sub_dirs, _files in
                                 os.walk(templates_base_path)]:
            for file in files:
                template_path = re.sub(templates_base_path, '', os.path.join(directory, file))
                templates.append(env.get_template(template_path))
        return templates

    @staticmethod
    def _create_parent_dir_if_not_exsists(file: str):
        parent_dir = path.realpath(path.join(file, '..'))
        if not path.exists(parent_dir):
            os.makedirs(parent_dir)

    def generate(self, target_dir: str, application: ApplicationModel or dict):
        if isinstance(application, ApplicationModel):
            application = application.__dict__

        path_parser = Environment(loader=BaseLoader)

        for template in self.templates:
            initial_target_file = path_parser.from_string(path.join(target_dir, template.name[1:])).render(app=application, helpers=Helpers)
            self._create_parent_dir_if_not_exsists(initial_target_file)
            print('[+] processing: ', initial_target_file)
            generated_content = template.render(domain_models=application['entities'], app=application, helpers=Helpers)
            f = open(initial_target_file, 'w')
            files_to_execute = []
            target_file = initial_target_file
            for line in generated_content.splitlines():
                if line.find('py-conf-meta-inf: {') > -1:
                    meta_data = json.loads(re.sub('^.*py-conf-meta-inf: ', '', line))
                    if 'file_name' in meta_data:
                        f.close()
                        file_name = meta_data['file_name']
                        target_file = path.realpath(path.join(initial_target_file, '..', file_name))
                        self._create_parent_dir_if_not_exsists(target_file)
                        f = open(target_file, 'w')
                    if 'execute' in meta_data and meta_data['execute']:
                        files_to_execute.append(target_file)
                else:
                    f.write(line + '\n')
            f.close()
            for file_to_execute in files_to_execute:
                print('[+] executing:  ', file_to_execute)
                # TODO: WINDOWS COMPATIBLE
                call(['chmod', '+x', file_to_execute])
                # TODO: WINDOWS COMPATIBLE
                call(['bash', file_to_execute], cwd=path.realpath(path.join(file_to_execute, '..')))
                os.remove(file_to_execute)
            if os.path.exists(initial_target_file) and os.stat(initial_target_file).st_size == 0:
                os.remove(initial_target_file)
            parent_dir = os.path.realpath(path.join(initial_target_file, '..'))
            if os.path.exists(parent_dir) and len(os.listdir(parent_dir)) == 0:
                os.removedirs(parent_dir)
            print('[+] processed:  ', initial_target_file)


class Helpers(object):

    @staticmethod
    def to_camel_case(s: str) -> str:
        s = re.sub(r"(_|-)+|([A-Z]+)", " \\2", s).title().replace(" ", "")
        return ''.join([s[0].lower(), s[1:]])

    @staticmethod
    def to_pascal_case(s: str) -> str:
        s = re.sub(r"(_|-)+|([A-Z]+)", " \\2", s).title().replace(" ", "")
        return ''.join([s[0].upper(), s[1:]])

    @staticmethod
    def to_snake_case(s: str) -> str:
        s = re.sub(r"(_|-)+|([A-Z]+)", " \\2", s).title().replace(" ", "_")
        return re.sub('^_', '', s.lower())

    @staticmethod
    def to_snake_case_upper(s: str) -> str:
        return Helpers.to_snake_case(s).upper()

    @staticmethod
    def to_kebab_case(s: str) -> str:
        s = re.sub(r"(_|-)+|([A-Z]+)", " \\2", s).title().replace(" ", "-")
        return re.sub('^-', '', s.lower())
