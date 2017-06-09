/* eslint-disable no-console */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('../webpack.config.babel');
const datalakeConfig = require('./api/keyspaceConfigs/datalake.config');
const evaluationConfig = require('./api/keyspaceConfigs/evaluation.config');
const datalakeSchemaConfig = require('./api/schemaConfigs/datalakeConfig');
const evaluationSchemaConfig = require('./api/schemaConfigs/evaluationConfig');

const modelLoader = require('./api/helpers/modelLoader');
const modelRouter = require('./api/helpers/modelRouter');
const subjectsQueryConfig = require('./api/queryConfigs/subjects');
const versionsQueryConfig = require('./api/queryConfigs/versions');
const duplicateCandidatesQueryConfig = require('./api/queryConfigs/duplicateCandidates');
const blockingStatsQueryConfig = require('./api/queryConfigs/blockingstats');
const simMeasureStatsQueryConfig = require('./api/queryConfigs/simMeasureStats');

// setup cassandra ORM
const datalakeModels = modelLoader(datalakeConfig, datalakeSchemaConfig);
const evaluationModels = modelLoader(evaluationConfig, evaluationSchemaConfig);

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = express();
app.use(compression());

if (isDeveloping) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
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
} else {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
}


// parse data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log(req.method, '/api' + req.url);
  next(); // make sure we go to the uniqueKey routes and don't stop here
});

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the Ingestion & Curation API' });
});

app.use('/api', router);
app.use('/api/subjects', modelRouter(datalakeModels, 'Subject', subjectsQueryConfig));
app.use('/api/subjects_temp', modelRouter(datalakeModels, 'Subject_Temp', subjectsQueryConfig));
app.use('/api/subjects_dbpedia', modelRouter(datalakeModels, 'Subject_DBpedia', subjectsQueryConfig));
app.use('/api/subjects_wikidata', modelRouter(datalakeModels, 'Subject_Wikidata', subjectsQueryConfig));
app.use('/api/eval/subjects_dbpedia', modelRouter(evaluationModels, 'Subject_DBpedia', subjectsQueryConfig));
app.use('/api/eval/subjects_wikidata', modelRouter(evaluationModels, 'Subject_Wikidata', subjectsQueryConfig));
app.use('/api/versions', modelRouter(datalakeModels, 'Version', versionsQueryConfig));
app.use('/api/duplicates', modelRouter(datalakeModels, 'Duplicates', duplicateCandidatesQueryConfig));
app.use('/api/new_duplicates', modelRouter(evaluationModels, 'DBpedia_WikiData_Duplicates', duplicateCandidatesQueryConfig));
app.use('/api/blockingstats', modelRouter(datalakeModels, 'BlockingStats', blockingStatsQueryConfig));
app.use('/api/simstats', modelRouter(evaluationModels, 'SimMeasureStats', simMeasureStatsQueryConfig));

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Curation☣ interface is running on port %s in %s environment', port, process.env.NODE_ENV);
});
