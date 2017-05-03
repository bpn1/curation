const queryConfig = {
  normal: ['category', 'name'],
  lists: ['aliases'],
  maps: ['properties', 'relations'],
  uniqueKey: 'id',
  custom_routes: [
    {
      name: 'without_history',
      options: {
        select: ['id', 'name', 'aliases', 'category', 'properties', 'relations']
      }
    },
  ]
};

module.exports = queryConfig;
