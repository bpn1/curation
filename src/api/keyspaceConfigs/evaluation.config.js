const versionUDT = require('../models/VersionUDT');
const subjectUDT = require('../models/SubjectUDT');
const precisionRecallDataTupleUDT = require('../models/PrecisionRecallDataTupleUDT');
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
      precisionrecalldatatuple: precisionRecallDataTupleUDT
    },
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 3
    },
    migration: 'safe',
    createKeyspace: false
  }
};
