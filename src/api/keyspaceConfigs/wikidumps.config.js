const cassandraAuthProvider = require('../../../cassandraAuth.config');
const models = require('express-cassandra');

module.exports = {
  clientOptions: {
    contactPoints: ['odin01', 'odin02', 'odin03', 'odin04', 'odin05', 'odin06', 'odin07', 'odin08'],
    protocolOptions: { port: 9042 },
    keyspace: 'wikidumps',
    queryOptions: { consistency: models.consistencies.one },
    authProvider: cassandraAuthProvider
  },
  ormOptions: {
    udts: {},
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 3
    },
    migration: 'safe',
    createKeyspace: false
  }
};
