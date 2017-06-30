module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
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
    master: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
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
  key: ['id'],
  table_name: 'subject'
};
