import createDuck from './apiDuck';

const versionDuck = createDuck({ namespace: 'curation', store: 'version', path: '/versions' });

export default versionDuck;
