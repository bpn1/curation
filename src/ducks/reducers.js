import duplicatesDuck from './duplicateDuck';
import { subjects } from './subjectDuck';
import graphDuck from './graphDuck';

export default {
  duplicate: duplicatesDuck.reducer,
  subject: subjects.reducer,
  graph: graphDuck.reducer,
};
