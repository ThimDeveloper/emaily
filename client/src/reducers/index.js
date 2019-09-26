import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
