const queryConfig = {
  normal: ['id', 'category', 'name'],
  lists: ['aliases'],
  maps: ['properties', 'relations'],
  like: ['name'],
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
