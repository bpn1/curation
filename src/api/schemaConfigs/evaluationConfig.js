/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
    model: require('../models/DuplicatesModel'),
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
