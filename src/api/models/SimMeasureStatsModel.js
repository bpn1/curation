module.exports = {
  fields: {
    id: {
      type: 'timeuuid',
      default: { $db_function: 'now()' }
    },
    comment: {
      type: 'text'
    },
    xaxis: {
      type: 'text'
    },
    yaxis: {
      type: 'text'
    },
    data: {
      type: 'list',
      typeDef: '<frozen<precisionrecalldatatuple>>'
    },
  },
  key: ['id'],
  table_name: 'sim_measure_stats'
};
