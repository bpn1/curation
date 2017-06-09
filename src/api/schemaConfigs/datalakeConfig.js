const schemaConfig = [
  {
    name: 'BlockingStats',
    model: require('../models/BlockingStatsModel'),
    table_name: 'blockingstats'
  },
  {
    name: 'Duplicates',
    model: require('../models/DuplicatesModel'),
    table_name: 'duplicates'
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
    name: 'Subject_Temp',
    model: require('../models/SubjectModelWithMaster'),
    table_name: 'subject_temp'
  },
  {
    name: 'Subject_DBpedia',
    model: require('../models/SubjectModelWithMaster'),
    table_name: 'subject_dbpedia'
  },
  {
    name: 'Subject_Wikidata',
    model: require('../models/SubjectModelWithMaster'),
    table_name: 'subject_wikidata'
  },
  {
    name: 'Version',
    model: require('../models/VersionModel'),
    table_name: 'version'
  },
];

module.exports = schemaConfig;
