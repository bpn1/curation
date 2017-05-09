const schemaConfig = [
  {
    name: 'BlockingStats',
    model: require('../models/BlockingStatsModel'),
    table_name: 'blockingstats'
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
    name: 'Version',
    model: require('../models/VersionModel'),
    table_name: 'version'
  },
];

module.exports = schemaConfig;
