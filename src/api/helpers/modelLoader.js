const Cassandra = require('express-cassandra');

module.exports = function (modelConfig, schemaConfig) {
  const models = Cassandra.createClient(modelConfig);
  models.connect(function (err) {
    if (err) throw err;
    schemaConfig.forEach(function (config) {
      // use Object.assign to overwrite default table_name,
      // so we could still load these files with the setDirectory/bind method
      const model = Object.assign(config.model, { table_name: config.table_name });
      models.loadSchema(config.name, model);
      console.log('Model loaded: ' + config.name);
    });
  }, function (err) {
    console.log(err);
  });
  return models;
};
