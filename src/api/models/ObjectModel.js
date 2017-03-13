
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
  },
  key: ['id'],
  table_name: 'object'
};
