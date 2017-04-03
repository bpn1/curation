const _ = require('lodash');
const models = require('express-cassandra');

const PAGING_LIMIT = 20;

module.exports = {
  buildQuery(getParams, queryConfig) {
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
    if (getParams.next) {
      query[queryConfig.next] = { $token: { $gt: models.uuidFromString(getParams.next) } };
    }
    query.$limit = Number(getParams.count) || PAGING_LIMIT;
    return query;
  },
  logError(err, res) {
    console.log(err);
    res.json({ message: 'An error occurred' });
  }
};
