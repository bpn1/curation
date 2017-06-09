module.exports = {
  fields: {
    subject_id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    candidates: {
      type: 'list',
      typeDef: '<frozen<candidate>>'
    },
    datasource: {
      type: 'text'
    },
    subject_name: {
      type: 'text'
    }
  },
  key: ['subject_id'],
  table_name: 'duplicates'
};
