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
