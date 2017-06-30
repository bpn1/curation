module.exports = {
  fields: {
    master: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    datasource: {
      type: 'text'
    },
    aliases: {
      type: 'list',
      typeDef: '<text>'
    },
    aliases_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    category: {
      type: 'text'
    },
    category_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    master_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    name: {
      type: 'text'
    },
    name_history: {
      type: 'list',
      typeDef: '<frozen<version>>'
    },
    properties: {
      type: 'map',
      typeDef: '<text, frozen<list<text>>>'
    },
    properties_history: {
      type: 'map',
      typeDef: '<text, frozen<list<frozen<version>>>>'
    },
    relations: {
      type: 'map',
      typeDef: '<uuid, frozen<map<text, text>>>'
    },
    relations_history: {
      type: 'map',
      typeDef: '<uuid, frozen<map<text, frozen<list<frozen<version>>>>>>'
    },
  },
  key: ['master', 'id', 'datasource'],
  table_name: 'subject'
};
