/* eslint-disable no-console */
const express = require('express');
const routeUtils = require('../helpers/route-util');

const queryConfig = {
  normal: ['comment'],
  lists: [],
  maps: ['data'],
  next: 'id'
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
      models.instance.Deduplicationstats.findAsync(query, options)
        .then(duplicateCandidates => res.json(duplicateCandidates))
        .catch(err => routeUtils.logError(err, res));
    })
    .post(function (req, res) {
      const options = {
        if_not_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      const duplicateCandidate = new models.instance.Deduplicationstats(req.body);
      duplicateCandidate.saveAsync(options)
        .then(function () {
          console.info('Created new duplicate candidate');
          res.json({ message: 'Created new duplicate candidate', id: duplicateCandidate.id });
        })
        .catch(err => routeUtils.logError(err, res));
    });

  router.route('/:id')
    .get(function (req, res) {
      models.instance.Deduplicationstats.findOneAsync({ id: models.uuidFromString(req.params.id) })
        .then(duplicateCandidate => res.json(duplicateCandidate))
        .catch(err => routeUtils.logError(err, res));
    })
    .put(function (req, res) {
      const options = {
        if_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      models.instance.Deduplicationstats.update({
        id: models.uuidFromString(req.params.id)
      }, req.body, options, function (err) {
        if (err) {
          routeUtils.logError(err, res);
          return;
        }
        res.json({ message: 'Update successful' });
      });
    })
    .delete(function (req, res) {
      models.instance.Deduplicationstats.findOneAsync({ id: models.uuidFromString(req.params.id) })
        .then(duplicateCandidate => duplicateCandidate.delete(function (err) {
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
