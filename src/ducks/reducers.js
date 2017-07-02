import duplicatesDuck from './duplicateDuck';
import { subjects } from './subjectDuck';
import versionDuck from './versionDuck';
import versionDiffDuck from './versionDiffDuck';
import graphDuck from './graphDuck';
import linkedArticlesDuck from './linkedArticlesDuck';

export default {
  duplicate: duplicatesDuck.reducer,
  subject: subjects.reducer,
  version: versionDuck.reducer,
  versiondiff: versionDiffDuck.reducer,
  graph: graphDuck.reducer,
  linkedArticles: linkedArticlesDuck.reducer
};
