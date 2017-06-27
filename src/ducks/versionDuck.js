import axios from 'axios';
import createDuck from './apiDuck';

const versionDuck = createDuck({ namespace: 'curation', store: 'version', path: '/versions' }).extend({
  types: ['RESTORE_VERSION'],
  creators: ({ types }) => ({
    restoreVersion: version => ({
      type: types.RESTORE_VERSION,
      payload: axios.get('/api/run/versionrestore/' + version)
    })
  })
});

export default versionDuck;
