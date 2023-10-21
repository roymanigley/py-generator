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
], relations=[
    Relation(name='gender', entity=gender)
])
application = ApplicationModel(app_name='Dummy', entities=[gender, person])

base_dir = '/tmp/experiment/experiment_app'
Generator().generate(base_dir, application)