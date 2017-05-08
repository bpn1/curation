const _ = require('lodash');
const express = require('express');

const PAGING_LIMIT = 20;

module.exports = function (models, modelName, queryConfig) {
  function logError(err, res) {
    console.log(err);
    res.json({ message: 'An error occurred' });
  }
  function buildQuery(getParams) {
    const query = _.pick(getParams, queryConfig.normal);
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
            .catch(err => logError(err, res));
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
    models.instance[modelName].findOneAsync({ [queryConfig.uniqueKey]: models.timeuuidFromString(req.params.id) })
      .then(row => res.json(row))
      .catch(err => logError(err, res));
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
  return router;
};
