/**
 * @reducer       : index reducer
 * @description   :
 * @Created by    : smartData
 */

import { combineReducers } from 'redux';
import MomoReducer from './MomoReducer';


import { reducer as formReducer } from 'redux-form';   //SAYING use redux form reducer as reducer

const rootReducer = combineReducers({
  form        : formReducer,
  quoteData   : MomoReducer
});

export default rootReducer;
