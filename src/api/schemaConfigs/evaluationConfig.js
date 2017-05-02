const schemaConfig = [
  {
    name: 'Deduplicationstats',
    model: require('../models/DeduplicationstatsModel'),
    table_name: 'deduplicationstats'
  },
  {
    name: 'DuplicateCandidates',
    model: require('../models/DuplicateCandidatesModel'),
    table_name: 'duplicatecandidates'
  },
  {
    name: 'DuplicateCandidates_DBpedia_Wikidata',
    model: require('../models/DuplicateCandidatesModel'),
    table_name: 'dbpedia_wikidata_deduplication'
  },
  {
    name: 'Goldstandard',
    model: require('../models/GoldstandardModel'),
    table_name: 'goldstandard'
  },
  {
    name: 'SimMeasureStats',
    model: require('../models/SimMeasureStatsModel'),
    table_name: 'sim_measure_stats'
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
    name: 'Subject_Wikidata',
    model: require('../models/SubjectModel'),
    table_name: 'subject_wikidata'
  },
  {
    name: 'Subject_DBpedia',
    model: require('../models/SubjectModel'),
    table_name: 'subject_dbpedia'
  },
  {
    name: 'Version',
    model: require('../models/VersionModel'),
    table_name: 'version'
  },
];

module.exports = schemaConfig;
