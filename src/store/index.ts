import { createStore, combineReducers } from 'redux';
import * as actions from './actions';
import * as reducers from './reducers';
const store = createStore(combineReducers(reducers));
export { actions };
export default store;
