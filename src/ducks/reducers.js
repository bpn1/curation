import duplicatesDuck from './duplicateDuck';
import { subjects } from './subjectDuck';
import graphDuck from './graphDuck';
import linkedArticlesDuck from './linkedArticlesDuck';

export default {
  duplicate: duplicatesDuck.reducer,
  subject: subjects.reducer,
  graph: graphDuck.reducer,
  linkedArticles: linkedArticlesDuck.reducer
};
