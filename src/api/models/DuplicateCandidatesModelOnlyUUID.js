module.exports = {
  fields: {
    subject_id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    candidates: {
      type: 'list',
      typeDef: '<frozen<tuple<uuid, text, double>>>'
    }
  },
  key: ['subject_id'],
  table_name: 'duplicatecandidates'
};
