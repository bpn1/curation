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
      type: 'text'
    }
  },
  key: ['id'],
  table_name: 'stats'
};
