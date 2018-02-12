import Cookies from 'js-cookie';
import { 
  SET_VALUE,
  SET_TO,
  SET_FROM,
  SET_NOTES
     } from '../constants/memory.constant';

//grabs from cookies in App.js
const initialState = {
  lastValue: '',
  lastFrom: '',
  lastTo: '',
  lastNotes: ''
};

const expires = {
  value: 1,
  from: 1,
  to: 1,
  notes: 5
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES: 
      Cookies.set('lastNotes', action.payload, { expires: expires.notes });
      return { ...state, lastNotes: action.payload }
    case SET_VALUE: 
      Cookies.set('lastValue', action.payload, { expires: expires.value });
      return { ...state, lastValue: action.payload }
    case SET_FROM: 
      Cookies.set('lastFrom', action.payload, { expires: expires.from });
      return { ...state, lastFrom: action.payload }
    case SET_TO: 
      Cookies.set('lastTo', action.payload, { expires: expires.to });
      return { ...state, lastTo: action.payload }
    default:
      return state;
  }
};