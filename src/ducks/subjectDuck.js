import createDuck from './apiDuck';

export const subjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects' });
// Only use action creators and use subject reducer for all
export const tempSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_temp' });
export const dbpediaSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_dpbedia' });
export const wikiDataSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_wikidata' });
