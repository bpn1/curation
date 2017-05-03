const schemaConfig = [
  {
    name: 'Deduplicationstats',
    model: require('../models/DeduplicationstatsModel'),
    table_name: 'deduplicationstats'
  },
  {
    name: 'Stats',
    model: require('../models/StatsModel'),
    table_name: 'stats'
  },
  {
    name: 'DuplicateCandidates',
    model: require('../models/DuplicateCandidatesModel'),
    table_name: 'duplicatecandidates'
  },
  {
    name: 'Object',
    model: require('../models/ObjectModel'),
    table_name: 'object'
  },
  {
    name: 'Subject',
    model: require('../models/SubjectModel'),
    table_name: 'subject'
  },
  {
    name: 'SubjectTemp',
    model: require('../models/SubjectModel'),
    table_name: 'subject_temp'
  },
  {
    name: 'SimMeasureStats',
    model: require('../models/SimMeasureStatsModel'),
    table_name: 'sim_measure_stats'
  },
  {
    name: 'Version',
    model: require('../models/VersionModel'),
    table_name: 'version'
  },
];

module.exports = schemaConfig;
