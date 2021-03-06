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

const express = require('express');

const PAGING_LIMIT = 50;

module.exports = function (models, modelName, queryConfig) {
  function logError(err, res) {
    console.log(err);
    res.json({ message: 'An error occurred' });
  }

  function schema() {
    // access private _properties, may be subject to change
    return models.instance[modelName]._properties.schema.fields;
  }

  function buildQuery(getParams) {
    const query = {};
    queryConfig.normal.forEach((property) => {
      if (getParams[property]) {
        // if ',' contained, split and search for each element
        if (getParams[property].indexOf(',') !== -1) {
          let splitParams = getParams[property].split(',');
          if (schema()[property].type === 'uuid' || schema()[property].type === 'timeuuid') {
            splitParams = splitParams.map(models.timeuuidFromString);
          }
          query[property] = { $in: splitParams };
        } else {
          if (schema()[property].type === 'uuid' || schema()[property].type === 'timeuuid') {
            query[property] = models.timeuuidFromString(getParams[property]);
          } else {
            query[property] = getParams[property];
          }
          if (queryConfig.like && queryConfig.like.indexOf(property) !== -1) {
            // prefix search
            query[property] = { $like: getParams[property] + '%' };
          }
        }
      }
    });
    queryConfig.lists.forEach((property) => {
      if (getParams[property]) {
        query[property] = { $contains: getParams[property] };
      }
    });
    queryConfig.maps.forEach((property) => {
      if (getParams[property]) {
        // CONTAIN here searches map values, and $contains gets an array of values
        query[property] = { $contains: [getParams[property]] };
      }
    });
    if (getParams.uniqueKey) {
      query[queryConfig.uniqueKey] = { $token: { $gt: models.uuidFromString(getParams.queryConfig.uniqueKey) } };
    }
    query.$limit = Number(getParams.count) || PAGING_LIMIT;
    return query;
  }

  function buildCustomRoutes(router, customRoutes) {
    customRoutes.forEach((route) => {
      router.route('/' + route.name + '/')
        .get(function (req, res) {
          const options = {
            allow_filtering: true,
            ttl: 86400
          };
          if (route.options) {
            Object.assign(options, route.options);
          }
          console.log('Options: ', options);
          const query = buildQuery(req.query, queryConfig);
          if (route.query) {
            Object.assign(query, route.query);
          }
          console.log('Query: ', query);
          models.instance[modelName].findAsync(query, options)
            .then(row => res.json(row))
            .catch((err) => {
              logError(err, res);
            });
        });
    });
  }

  const router = express.Router();
  if (queryConfig.custom_routes) {
    buildCustomRoutes(router, queryConfig.custom_routes);
  }
  router.route('/')
    .get(function (req, res) {
      const options = {
        allow_filtering: true,
        ttl: 86400
      };
      const query = buildQuery(req.query, queryConfig);
      console.log(query);
      if (queryConfig.custom_params) {
        queryConfig.custom_params.forEach((param) => {
          if (param.name in req.query) {
            if (param.options) {
              Object.assign(options, param.options);
            }
            if (param.query) {
              Object.assign(query, param.query);
            }
          }
        });
      }
      models.instance[modelName].findAsync(query, options)
        .then(row => res.json(row))
        .catch(err => logError(err, res));
    })
    .post(function (req, res) {
      const options = {
        if_not_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      const row = new models.instance[modelName](req.body);
      row.saveAsync(options)
        .then(function () {
          console.info(`Created new ${modelName}`);
          res.json({ message: `Created new ${modelName}`, [queryConfig.uniqueKey]: row[queryConfig.uniqueKey] });
        })
        .catch(err => logError(err, res));
    });

  router.route('/:id')
    .get(function (req, res) {
      const options = {
        allow_filtering: true,
        ttl: 86400
      };
      const query = buildQuery(req.query, queryConfig);
      models.instance[modelName]
        .findOneAsync(Object.assign(query, { [queryConfig.uniqueKey]: models.timeuuidFromString(req.params.id) }), options)
        .then((row) => {
          if (!row || row === '') {
            throw new Error(`UUID ${req.params.id} not found`);
          }
          res.json(row);
        })
        .catch((err) => {
          res.send({
            message: `UUID ${req.params.id} not found`,
            id: req.params.id
          });
        });
    })
    .put(function (req, res) {
      const options = {
        if_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      models.instance[modelName].update({
        [queryConfig.uniqueKey]: models.timeuuidFromString(req.params.id)
      }, req.body, options, function (err) {
        if (err) {
          logError(err, res);
          return;
        }
        res.json({ message: 'Update successful' });
      });
    })
    .delete(function (req, res) {
      models.instance[modelName].findOneAsync({ [queryConfig.uniqueKey]: models.timeuuidFromString(req.params.id) })
        .then(row => row.delete(function (err) {
          if (err) {
            logError(err, res);
            return;
          }
          res.json({ message: 'Delete successful' });
        }))
        .catch(err => logError(err, res));
    });
  // Route for tables with 2 primary keys
  router.route('/:id/:key')
    .get(function (req, res) {
      models.instance[modelName]
        .findOneAsync({
          [queryConfig.uniqueKey]: models.timeuuidFromString(req.params.id),
          [queryConfig.key]: req.params.key
        })
        .then(row => res.json(row))
        .catch(err => logError(err, res));
    });
  return router;
};
