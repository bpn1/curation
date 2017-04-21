module.exports = {
  fields: {
    subject_id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    candidates: {
      type: 'list',
      typeDef: '<frozen<tuple<frozen<subject>, text, double>>>'
    }
  },
  key: ['subject_id'],
  table_name: 'duplicatecandidates'
};
