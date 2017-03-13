const _ = require('lodash');

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
    return query;
  },
  logError(err, res) {
    console.log(err);
    res.json({ message: 'An error occurred' });
  }
};
