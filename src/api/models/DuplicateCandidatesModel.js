
module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    duplicate_id: {
      type: 'uuid'
    },
    duplicate_name: {
      type: 'text'
    },
    duplicate_table: {
      type: 'text'
    },
    subject_id: {
      type: 'uuid'
    },
    subject_name: {
      type: 'text'
    },
  },
  key: ['id'],
  table_name: 'duplicatecandidates'
};
