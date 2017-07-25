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

const versionUDT = require('../models/VersionUDT');
const subjectUDT = require('../models/SubjectUDT');
const precisionRecallDataTupleUDT = require('../models/PrecisionRecallDataTupleUDT');
const CandidateUDT = require('../models/CandidateUDT');
const cassandraAuthProvider = require('../../../cassandraAuth.config');
const models = require('express-cassandra');

module.exports = {
  clientOptions: {
    contactPoints: ['odin01', 'odin02', 'odin03', 'odin04', 'odin05', 'odin06', 'odin07', 'odin08'],
    protocolOptions: { port: 9042 },
    keyspace: 'evaluation',
    queryOptions: { consistency: models.consistencies.one },
    authProvider: cassandraAuthProvider
  },
  ormOptions: {
    udts: {
      version: versionUDT,
      subject: subjectUDT,
      precisionrecalldatatuple: precisionRecallDataTupleUDT,
      candidate: CandidateUDT
    },
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 3
    },
    migration: 'safe',
    createKeyspace: false
  }
};
