const queryConfig = {
  normal: ['schemetag', 'comment'],
  lists: [],
  maps: [],
  uniqueKey: 'jobid',
  key: 'schemetag',
  custom_params: [
    {
      name: 'noData',
      options: {
        select: ['jobid', 'schemetag', 'comment']
      }
    },
  ]
};

module.exports = queryConfig;
