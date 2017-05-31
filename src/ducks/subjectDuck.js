import createDuck from './apiDuck';

export const subjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects' });
// Only use action creators and use subject reducer for all
export const dbpediaSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/eval/subjects_dbpedia' });
export const wikiDataSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/eval/subjects_wikidata' });
