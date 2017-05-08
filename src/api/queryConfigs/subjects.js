const queryConfig = {
  normal: ['category', 'name'],
  lists: ['aliases'],
  maps: ['properties', 'relations'],
  uniqueKey: 'id',
  custom_params: [
    {
      name: 'noHistory',
      options: {
        select: ['id', 'name', 'aliases', 'category', 'properties', 'relations']
      }
    },
  ]
};

module.exports = queryConfig;
