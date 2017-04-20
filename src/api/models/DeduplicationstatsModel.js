module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    comment: {
      type: 'text'
    },
    data: {
      type: 'map',
      typeDef: '<frozen<list<text>>, int>'
    }
  },
  key: ['id'],
  table_name: 'deduplicationstats'
};
