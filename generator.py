import os
import re
from os import path
from typing import List

from jinja2 import Environment, FileSystemLoader, Template

from model import ApplicationModel

TEMPLATES_BASE_PATH = path.realpath(path.join(__file__, '../templates'))


class Generator(object):
    templates = []

    def __init__(self):
        self.templates = self._init_templates()

    @staticmethod
    def _init_templates(template_type='django-ninja') -> List[Template]:
        templates = []
        templates_base_path = os.path.join(TEMPLATES_BASE_PATH, template_type)
        env = Environment(loader=FileSystemLoader(templates_base_path))
        for directory, files in [(_dir, _files) for _dir, _sub_dirs, _files in
                                 os.walk(templates_base_path)]:
            for file in files:
                template_path = re.sub(templates_base_path, '', os.path.join(directory, file))
                templates.append(env.get_template(template_path))
        return templates

    def generate(self, target_dir: str, application: ApplicationModel or dict):
        if isinstance(application, ApplicationModel):
            application = application.__dict__

        for template in self.templates:
            target_file = path.join(target_dir, template.name[1:])
            target_directory = path.realpath(path.join(target_file, '..'))
            if not path.exists(target_directory):
                os.makedirs(target_directory)
            print('[+] generating: ', target_file)
            generated_content = template.render(domain_models=application['entities'])
            with open(target_file, 'w') as f:
                f.write(generated_content)
            print('[+] generated:  ', target_file)
