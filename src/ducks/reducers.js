import duplicatesDuck from './duplicateDuck';
import graphDuck from './graphDuck';
import { subjects } from '../ducks/subjectDuck';

export default {
  duplicate: duplicatesDuck.reducer,
  subject: subjects.reducer,
  graph: graphDuck.reducer
};
