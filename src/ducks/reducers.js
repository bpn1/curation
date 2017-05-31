import duplicatesDuck from './duplicateDuck';
import { subjects } from '../ducks/subjectDuck';

export default {
  duplicate: duplicatesDuck.reducer,
  subject: subjects.reducer
};
