const queryConfig = {
  normal: ['schemetag', 'comment'],
  lists: [],
  maps: [],
  uniqueKey: 'jobid',
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
