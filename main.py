from generator import Generator
from model import ApplicationModel, Entity, Field, DataType, Relation

gender = Entity('ChildEntity', fields=[Field('name', data_type=DataType.STRING)])
person = Entity('ParentEntity', fields=[
    Field(**{'name': 'str_field', 'data_type': DataType.STRING, 'required': True, 'max_len': 255}),
    Field(**{'name': 'text_field', 'data_type': DataType.STRING, 'required': True}),
    Field(**{'name': 'int_number', 'data_type': DataType.INTEGER, 'required': True}),
    Field(**{'name': 'float_number', 'data_type': DataType.FLOAT, 'required': True}),
    Field(**{'name': 'date_field', 'data_type': DataType.DATE, 'required': True}),
    Field(**{'name': 'date_time_field', 'data_type': DataType.DATE_TIME, 'required': True}),
    Field(**{'name': 'boolean_field', 'data_type': DataType.BOOLEAN, 'required': True}),
], relations=[
    Relation(name='child', entity=gender)
])
application = ApplicationModel(app_name='Dummy', entities=[gender, person])

base_dir = '/home/royman/repo/local/aaaa-angular/py-generator'
base_dir = '/tmp/aaa/'
Generator('django-ninja').generate(base_dir, application)
Generator('angular').generate(base_dir, application)

# base_dir = '/tmp/experiment/experiment_app'
# Generator().generate(base_dir, application)
