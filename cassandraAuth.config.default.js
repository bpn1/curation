const cassandraAuthProvider =
  new models.driver.auth
    .DsePlainTextAuthProvider('user', 'password');

module.exports = cassandraAuthProvider;
