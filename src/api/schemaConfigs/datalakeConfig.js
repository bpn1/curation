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
    model: require('../models/SubjectModel'),
    table_name: 'subject_temp'
  },
  {
    name: 'Subject_DBpedia',
    model: require('../models/SubjectModel'),
    table_name: 'subject_dbpedia'
  },
  {
    name: 'Subject_Wikidata',
    model: require('../models/SubjectModel'),
    table_name: 'subject_wikidata'
  },
  {
    name: 'Version',
    model: require('../models/VersionModel'),
    table_name: 'version'
  },
  {
    name: 'VersionDiffs',
    model: require('../models/VersionDiffModel'),
    table_name: 'versiondiff'
  }
];

module.exports = schemaConfig;
