import enum
from typing import List


class DataType(enum.Enum):
    STRING = 'str'
    INTEGER = 'int'
    FLOAT = 'float'
    DATE = 'date'
    DATE_TIME = 'datetime'
    BOOLEAN = 'bool'


class Field(object):

    def __init__(self, name: str, data_type: DataType, required=True, unique=False, max_len: int = None):
        self.name = name
        self.data_type = data_type
        self.required = required
        self.unique = unique
        self.max_len = max_len


class Entity(object):

    def __init__(self, name: str, fields: List[Field] = None, relations: List['Relation'] = None):
        if relations is None:
            relations = []
        if fields is None:
            fields = []
        self.name = name
        self.fields = fields
        self.relations = relations


class Relation(object):

    def __init__(self, name, entity: Entity, required=True):
        self.name = name
        self.data_type = entity.name
        self.required = required
        self.display_field = entity.fields[0].name if len(entity.fields) > 0 else 'id'


class ApplicationModel(object):

    def __init__(self, app_name: str, entities: List[Entity] = None):
        if entities is None:
            entities = []
        self.app_name = app_name
        self.entities = entities