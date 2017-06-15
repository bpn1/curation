import createDuck from './apiDuck';
import { commitExtension } from './commitDuck';

export const subjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects' })
// extensions overwritte parent, so only extend once
  .extend(commitExtension);
// Only use action creators and use subject reducer for all
export const tempSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_temp' });
export const dbpediaSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_dpbedia' });
export const wikiDataSubjects = createDuck({ namespace: 'curation', store: 'subject', path: '/subjects_wikidata' });
