/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const models = require('express-cassandra');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.node');
const cassandraConfig = require('../cassandra.config.js');

const subjects = require('./api/routes/subjects')(models);
const versions = require('./api/routes/versions')(models);
const duplicateCandidates = require('./api/routes/duplicateCandidates')(models);

const runReactApp = process.argv.indexOf('react') > -1;
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

// setup cassandra ORM
models.setDirectory(path.join(__dirname, 'api', 'models')).bind(cassandraConfig,
  function (err) {
    if (err) console.log(err.message);
    else console.info('==> 🚀 Cassandra connected to %s', cassandraConfig.clientOptions.contactPoints.toString());
  }
);

if (runReactApp) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

// parse data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log(req.method, req.url);
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);
app.use('/api/subjects', subjects);
app.use('/api/versions', versions);
app.use('/api/duplicateCandidates', duplicateCandidates);

// serve JSON on /data
app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'versiondiff.json'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Curation☣ interface is running on port %s', port);
});
