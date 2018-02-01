import moment from 'moment';
import { 
  REBUILD_CHUNCKS,
  SET_FROM_TIME,
  SET_TO_TIME  } from '../constants/app.constant';

const initialState = {
  from: '',
  to: '',
  ids: [],
  byid: {}
};

let byid, ids, spare;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FROM_TIME: 
      return { ...state, from: action.payload }
    case SET_TO_TIME: 
      return { ...state, to: action.payload }
    case REBUILD_CHUNCKS:
     ({byid, ids, spare} = rebuildChuncks(action.ids, action.byid, state.from, state.to));
      return { ...state,
                spare: spare,
                ids: ids,
                byid: byid};
    default:
      return state;
  }
};

function rebuildChuncks(ids, byid, from, to) {
    //if given no start time, take system time and round it to five minutes
    if (!from) { 
      from = moment();
      const roundedUp = Math.ceil(moment(from).minute() / 5) * 5;
      from.minute(roundedUp).seconds(0);
    } 

    let anchorFrom = from;

    ids.forEach((id) => {
      let chunck = byid[id];
      let dur = chunck.dur;
      let name = chunck.name;

      // two digits == minutes, one digit == part of hour
      if (/\.\d{2}/.test(dur)) {
          dur = 60*~~(dur)+dur%1*100;
      } else {
          dur = 60*dur;
      }
      
      let anchorTo = anchorFrom.clone().add(dur, 'minutes');

      byid[id].from = anchorFrom;
      byid[id].to = anchorTo;

      anchorFrom = anchorTo;
    });

    let spare = buildSpare(anchorFrom, to);

    return {ids, byid, spare}
}

function buildSpare(start, end) {
  if (start && end) {
    return moment(end.diff(start)).format("h[h]m[m]");
  } else {
    return '';
  }
}