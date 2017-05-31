const schemaConfig = [
  {
    name: 'DuplicateCandidates',
    model: require('../models/DuplicateCandidatesModelWithSubject'),
    table_name: 'duplicatecandidates'
  },
  {
    name: 'DuplicateCandidates_DBpedia_Wikidata_OnlyUUID',
    model: require('../models/DuplicateCandidatesModelOnlyUUID'),
    table_name: 'dbpedia_wikidata_deduplication_only_uuid'
  },
  {
    name: 'DBpedia_WikiData_Duplicates',
    model: require('../models/DuplicateCandidatesModel'),
    table_name: 'dbpedia_wikidata_duplicates'
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
