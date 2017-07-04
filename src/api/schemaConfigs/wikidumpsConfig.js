const schemaConfig = [
  {
    name: 'LinkedArticles',
    model: require('../models/LinkedArticlesModel'),
    table_name: 'linkedarticles'
  },
  {
    name: 'LinkedArticles_New',
    model: require('../models/LinkedArticlesModel'),
    table_name: 'linkedarticles_new'
  },
  {
    name: 'SimMeasureStats',
    model: require('../models/SimMeasureStatsModel'),
    table_name: 'sim_measure_stats'
  }
];

module.exports = schemaConfig;
