/* eslint-disable no-console */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const exec = require('child_process').exec;

const config = require('../webpack.config.babel');
const sparkJobs = require('../spark_jobs.config');
const datalakeConfig = require('./api/keyspaceConfigs/datalake.config');
const evaluationConfig = require('./api/keyspaceConfigs/evaluation.config');
const wikidumpsConfig = require('./api/keyspaceConfigs/wikidumps.config');
const datalakeSchemaConfig = require('./api/schemaConfigs/datalakeConfig');
const evaluationSchemaConfig = require('./api/schemaConfigs/evaluationConfig');
const wikidumpsSchemaConfig = require('./api/schemaConfigs/wikidumpsConfig');

const modelLoader = require('./api/helpers/modelLoader');
const modelRouter = require('./api/helpers/modelRouter');
const subjectsQueryConfig = require('./api/queryConfigs/subjects');
const versionsQueryConfig = require('./api/queryConfigs/versions');
const duplicateCandidatesQueryConfig = require('./api/queryConfigs/duplicateCandidates');
const blockingStatsQueryConfig = require('./api/queryConfigs/blockingstats');
const simMeasureStatsQueryConfig = require('./api/queryConfigs/simMeasureStats');
const linkedArticlesQueryConfig = require('./api/queryConfigs/linkedArticles');
const versionDiffsQueryConfig = require('./api/queryConfigs/versiondiffs');

// setup cassandra ORM
const datalakeModels = modelLoader(datalakeConfig, datalakeSchemaConfig);
const evaluationModels = modelLoader(evaluationConfig, evaluationSchemaConfig);
const wikidumpsModels = modelLoader(wikidumpsConfig, wikidumpsSchemaConfig);

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

router.param('job', function (req, res, next, job) {
  const matchingJobs = Object.keys(sparkJobs).filter(correctJob => correctJob.toLowerCase() === job.toLowerCase());

  if (matchingJobs.length > 0) {
    req.job = sparkJobs[matchingJobs[0]];
    next();
  } else {
    const error = 'No matching job found for: ' + job;
    console.error(error);
    res.send(error);
  }
});

function isValidUUID(uuid) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid.match(regex);
}

router.param('args', function (req, res, next, argParam) {
  const args = argParam.split(',');
  console.log('Validating args:', args);
  let argumentsValid = req.job.argumentCount === args.length;
  let error = '';

  if (!argumentsValid) {
    error = `Argument count ${args.length} invalid, expected ${req.job.argumentCount} arguments!`;
    console.error(error);
    res.send(error);
    return;
  }

  args.forEach((arg, i) => {
    let argValid = false;
    if (req.job.argumentTypes[i] === 'uuid') argValid = isValidUUID(arg);

    if (!argValid) {
      error += `\nArgument #${i + 1} invalid: ${arg}`;
      console.error(error.trim());
    }

    argumentsValid = argumentsValid && argValid;
  });

  if (argumentsValid) {
    req.args = args;
    next();
  } else {
    res.send(error.trim());
  }
});

function printOutput(error, stdout, stderr) {
  if (error) console.error(error.stack.split('\n').splice(0, 2).join('\n'));
  else if (stderr) console.error(stderr);
  else console.log(stdout);
}

router.get('/run/:job/:args', function (req, res) {
  const message = `Running Spark job ${req.job.jobName} with arguments ${req.args}`;
  res.send('<pre>' + message + '</pre>');
  console.log(message);
  const joinedArgs = req.args.join(' ');
  exec(`./run_job.sh ${req.job.jobName} ${joinedArgs}`, printOutput);
});

router.post('/run/:job', function (req, res) {
  const stringifiedBody = JSON.stringify(req.body);
  const message = `Running Spark job ${req.job.jobName} with data ${stringifiedBody}`;
  res.send('<pre>' + message + '</pre>');
  console.log(message);
  exec(`./run_job.sh ${req.job.jobName} ${stringifiedBody}`, printOutput);
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
app.use('/api/blockingstats', modelRouter(datalakeModels, 'BlockingStats', blockingStatsQueryConfig));
app.use('/api/simstats', modelRouter(evaluationModels, 'SimMeasureStats', simMeasureStatsQueryConfig));
app.use('/api/versiondiffs', modelRouter(datalakeModels, 'VersionDiffs', versionDiffsQueryConfig));
app.use('/api/wiki/linkedarticles', modelRouter(wikidumpsModels, 'LinkedArticles', linkedArticlesQueryConfig));
app.use('/api/wiki/linkedarticles_new', modelRouter(wikidumpsModels, 'LinkedArticles_New', linkedArticlesQueryConfig));
app.use('/api/wiki/classifierstats', modelRouter(wikidumpsModels, 'SimMeasureStats', simMeasureStatsQueryConfig));

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Curation☣ interface is running on port %s in %s environment', port, process.env.NODE_ENV);
});
