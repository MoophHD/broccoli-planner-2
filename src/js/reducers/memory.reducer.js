import Cookies from 'js-cookie';
import { 
  SET_VALUE,
  SET_TO,
  SET_FROM
     } from '../constants/memory.constant';

const initialState = {
  lastValue: '',
  lastFrom: '',
  lastTo: ''
};

let byid, ids;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE: 
      Cookies.set('lastValue', action.payload);
      return { ...state, lastValue: action.payload }
    case SET_FROM: 
      Cookies.set('lastFrom', action.payload);
      return { ...state, lastFrom: action.payload }
    case SET_TO: 
      Cookies.set('lastTo', action.payload);
      return { ...state, lastTo: action.payload }
    default:
      return state;
  }
};