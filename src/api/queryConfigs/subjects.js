const queryConfig = {
  normal: ['master', 'datasource', 'id', 'category', 'name'],
  lists: ['aliases'],
  maps: ['properties', 'relations'],
  like: ['name'],
  uniqueKey: 'master',
  custom_params: [
    {
      name: 'noHistory',
      options: {
        select: ['master', 'id', 'datasource', 'name', 'aliases', 'category', 'properties', 'relations']
      }
    },
  ]
};

module.exports = queryConfig;
