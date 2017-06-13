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
    blockcount: {
      type: 'int'
    },
    comparisoncount: {
      type: 'bigint'
    },
    pairscompleteness: {
      type: 'double'
    },
    data: {
      type: 'frozen',
      typeDef: '<set<frozen<blockstats>>'
    }
  },
  key: ['jobid', 'schemetag'],
  table_name: 'blockingstats'
};
