const queryConfig = {
  normal: ['title', 'text'],
  lists: [],
  maps: [],
  uniqueKey: 'title',
  custom_params: [
    {
      name: 'noData',
      options: {
        select: ['title']
      }
    },
  ]
};

module.exports = queryConfig;
