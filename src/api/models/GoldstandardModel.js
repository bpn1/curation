module.exports = {
  fields: {
    id1: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
    id2: {
      type: 'uuid',
      default: { $db_function: 'uuid()' }
    },
  },
  key: ['id1'],
  table_name: 'goldstandard'
};
