module.exports = {
  fields: {
    jobid: {
      type: 'timeuuid',
      default: { $db_function: 'timeuuid()' }
    },
    schemetag: {
      type: 'text'
    },
    comment: {
      type: 'text'
    },
    data: {
      type: 'frozen',
      typeDef: '<set<frozen<blockstats>>'
    }
  },
  key: ['jobid', 'schemetag'],
  table_name: 'blockingstats'
};
