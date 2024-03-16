// reducers.ts

import { combineReducers } from 'redux';
import { cocktailReducer } from './cocktailReducer'; // Tu nuevo reducer

const rootReducer = combineReducers({
  cocktail: cocktailReducer,
});

export default rootReducer;
