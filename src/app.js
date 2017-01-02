/* eslint no-console:0 */
import React from "react"
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux'
import Layout from './layout'
import Store from './store'

injectTapEventPlugin();

// this is only relevant when using `hot` mode with webpack
// https://github.com/ericclemmons/webpack-hot-server-example
// const reloading = document.readyState === 'complete'
// if (module.hot) {
//   module.hot.accept(function(err) {
//     console.log('❌  HMR Error:', err)
//   })
//   if (reloading) {
//     console.log('🔁  HMR Reloading.')
//     onLoad()
//   } else {
//     console.info('✅  HMR Enabled.')
//     bootstrap()
//   }
// } else {
//   console.info('❌  HMR Not Supported.')
//   bootstrap()
// }

// function bootstrap() {
//   window.addEventListener('load', onLoad)
//   //$on(window, 'hashchange', onLoad)
// }

const app = document.getElementById('app');
render(
  <Provider store={Store}>
    <Layout />
  </Provider>
  , app);