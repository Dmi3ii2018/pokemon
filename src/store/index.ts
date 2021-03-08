import { combineReducers } from 'redux';
import pokemon from './pokemon';

export interface IInitialState {

}

const createRootReducer = () =>
  combineReducers({
    pokemon,
  });

export default createRootReducer;
