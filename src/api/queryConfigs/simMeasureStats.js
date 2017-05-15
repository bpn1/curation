const queryConfig = {
  normal: ['comment'],
  lists: [],
  maps: [],
  uniqueKey: 'id',
  custom_params: [
    {
      name: 'noData',
      options: {
        select: ['id', 'comment']
      }
    },
  ]
};

module.exports = queryConfig;
