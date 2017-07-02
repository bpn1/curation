import axios from 'axios';
import createDuck from './apiDuck';

const versionDuck = createDuck({ namespace: 'curation', store: 'version', path: '/versions' }).extend({
  types: ['RESTORE_VERSION', 'COMPUTE_DIFFERENCE'],
  creators: ({ types }) => ({
    restoreVersion: version => ({
      type: types.RESTORE_VERSION,
      payload: axios.get('/api/run/versionrestore/' + version)
    }),
    computeDifference: (oldVersion, newVersion) => ({
      type: types.COMPUTE_DIFFERENCE,
      payload: axios.get('/api/run/versiondiff/' + oldVersion + ',' + newVersion)
    })
  })
});

export default versionDuck;
