/* eslint no-console: 0 */
/* https://blog.risingstack.com/using-react-with-webpack-tutorial/ */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.node.js');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['odin01'], keyspace: 'datalake'});

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

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

// serve JSON on /data
app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'versiondiff.json'));
});
// cassandra version diff query
app.get('/cassandra', (req, res) => {
  client.execute('SELECT * FROM version')
    .then(result => res.send(result.rows))
    .catch(err => console.log(err));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
