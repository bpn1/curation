const versionUDT = require('./src/api/models/VersionUDT');
const models = require('express-cassandra');

module.exports = {
  clientOptions: {
    contactPoints: ['node1', 'node2', '...'],
    protocolOptions: { port: 9042 },
    keyspace: 'keyspacename',
    queryOptions: { consistency: models.consistencies.one },
    authProvider: new models.driver.auth.DsePlainTextAuthProvider('my_user', 'my_password')
  },
  ormOptions: {
    udts: {
      version: versionUDT
    },
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 3
    },
    migration: 'safe',
    createKeyspace: true
  }
};
