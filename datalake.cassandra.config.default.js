const versionUDT = require('./src/api/models/VersionUDT');
const subjectUDT = require('./src/api/models/SubjectUDT');
const blockStatsUDT = require('./src/api/models/BlockStatsUDT');
const models = require('express-cassandra');

module.exports = {
  clientOptions: {
    contactPoints: ['node1', 'node2', '...'],
    protocolOptions: { port: 9042 },
    keyspace: 'datalake',
    queryOptions: { consistency: models.consistencies.one },
    authProvider: new models.driver.auth.DsePlainTextAuthProvider('my_user', 'my_password')
  },
  ormOptions: {
    udts: {
      version: versionUDT,
      subject: subjectUDT,
      blockstats: blockStatsUDT
    },
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 3
    },
    migration: 'safe',
    createKeyspace: false
  }
};
