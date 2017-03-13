module.exports = {
  fields: {
    version: {
      type: 'timeuuid',
      default: { $db_function: 'now()' }
    },
    datasources: {
      type: 'list',
      typeDef: '<text>'
    },
    program: {
      type: 'text'
    },
    timestamp: {
      type: 'timestamp'
    }
  },
  key: ['version'],
  table_name: 'version'
};
