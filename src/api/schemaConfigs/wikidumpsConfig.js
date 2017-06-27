const schemaConfig = [
  {
    name: 'LinkedArticles',
    model: require('../models/LinkedArticlesModel'),
    table_name: 'linkedarticles'
  },
  {
    name: 'SimMeasureStats',
    model: require('../models/SimMeasureStatsModel'),
    table_name: 'sim_measure_stats'
  }
];

module.exports = schemaConfig;
