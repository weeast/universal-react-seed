import { combineReducers } from 'redux';
import questions from 'APP/reducers/questions';
import questionDetail from 'APP/reducers/questionDetail';

const rootReducer = combineReducers({
  questions,
  questionDetail
});

export default rootReducer;
