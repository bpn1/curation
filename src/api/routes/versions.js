/* eslint-disable no-console */
const express = require('express');
const routeUtils = require('../helpers/route-util');

const queryConfig = {
  normal: ['program'],
  lists: ['datasources'],
  maps: [],
  next: 'version'
};

module.exports = function (models) {
  const router = express.Router();
  router.route('/')
    .get(function (req, res) {
      const options = {
        allow_filtering: true,
        ttl: 86400
      };
      const query = routeUtils.buildQuery(req.query, queryConfig);
      console.log(query);
      models.instance.Version.findAsync(query, options)
        .then(versions => res.json(versions))
        .catch(err => routeUtils.logError(err, res));
    })
    .post(function (req, res) {
      const options = {
        if_not_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      const version = new models.instance.Version(req.body);
      version.saveAsync(options)
        .then(function () {
          console.info('Created new version');
          res.json({ message: 'Created new version', id: version.version });
        })
        .catch(err => routeUtils.logError(err, res));
    });

  router.route('/:version')
    .get(function (req, res) {
      models.instance.Version.findOneAsync({ version: models.timeuuidFromString(req.params.version) })
        .then(version => res.json(version))
        .catch(err => routeUtils.logError(err, res));
    })
    .put(function (req, res) {
      const options = {
        if_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      models.instance.Version.update({
        version: models.timeuuidFromString(req.params.version)
      }, req.body, options, function (err) {
        if (err) {
          routeUtils.logError(err, res);
          return;
        }
        res.json({ message: 'Update successful' });
      });
    })
    .delete(function (req, res) {
      models.instance.Version.findOneAsync({ version: models.timeuuidFromString(req.params.version) })
        .then(version => version.delete(function (err) {
          if (err) {
            routeUtils.logError(err, res);
            return;
          }
          res.json({ message: 'Delete successful' });
        }))
        .catch(err => routeUtils.logError(err, res));
    });
  return router;
};
