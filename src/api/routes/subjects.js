/* eslint-disable no-console */
const express = require('express');
const routeUtils = require('../helpers/route');

const queryConfig = {
  normal: ['category', 'name'],
  lists: ['aliases'],
  maps: ['properties', 'relations']
};

const DEFAULT_FETCH_SIZE = 20;
module.exports = function (models) {
  const router = express.Router();
  router.route('/')
    .get(function (req, res) {
      const options = {
        allow_filtering: true,
        fetchSize: (req.query.count || DEFAULT_FETCH_SIZE),
        ttl: 86400
      };
      const query = routeUtils.buildQuery(req.query, queryConfig);
      console.log(query);
      models.instance.Subject.findAsync(query, options)
        .then(subjects => res.json(subjects))
        .catch(err => routeUtils.logError(err, res));
    })
    .post(function (req, res) {
      const options = {
        if_not_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      const subject = new models.instance.Subject(req.body);
      subject.saveAsync(options)
        .then(function () {
          console.info('Created new subject');
          res.json({ message: 'Created new subject', id: subject.id });
        })
        .catch(err => routeUtils.logError(err, res));
    });

  router.route('/:id')
    .get(function (req, res) {
      models.instance.Subject.findOneAsync({ id: models.uuidFromString(req.params.id) })
        .then(subject => res.json(subject))
        .catch(err => routeUtils.logError(err, res));
    })
    .put(function (req, res) {
      const options = {
        if_exists: true,
        ttl: 86400
      };
      // TODO validate body params
      models.instance.Subject.update({
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
      models.instance.Subject.findOneAsync({ id: models.uuidFromString(req.params.id) })
        .then(subject => subject.delete(function (err) {
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
