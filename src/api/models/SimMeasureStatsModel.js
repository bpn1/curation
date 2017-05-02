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
      type: 'list',
      typeDef: '<frozen<tuple<double, double, double, double>>>'
    },
  },
  key: ['id'],
  table_name: 'sim_measure_stats'
};
