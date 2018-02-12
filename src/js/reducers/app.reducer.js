import moment from 'moment';
import { 
  REBUILD_CHUNCKS,
  SET_FROM_TIME,
  SET_TO_TIME,
  SET_CURRENT,
  CLEAR_CURRENT } from '../constants/app.constant';

const initialState = {
  active: -1,
  from: '',
  to: '',
  ids: [],
  byid: {},
  clearId: 0
};

let byid, ids, spare;
export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CURRENT: {
      return { ...initialState, clearId: state.clearId+1 }
    }
    case SET_CURRENT:
      return { ...state, active: action.payload }
    case SET_FROM_TIME: 
      ({byid, ids, spare} = rebuildChuncks(state.ids, state.byid, action.payload, state.to));
      return { ...state,
                spare: spare,
                ids: ids,
                byid: byid,
                from: action.payload};
    case SET_TO_TIME: 
      ({byid, ids, spare} = rebuildChuncks(state.ids, state.byid, state.from, action.payload));
      return { ...state,
                spare: spare,
                ids: ids,
                byid: byid,
                to: action.payload};
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
    let nativeFrom = from;

    //if given no start time, take system time and round it to five minutes
    if (!from) { 
      from = moment();
      const roundedUp = Math.ceil(moment(from).minute() / 5) * 5;
      from.minute(roundedUp).seconds(0).milliseconds(0);
    } 

    let anchorFrom = from;

    ids.forEach((id) => {
      let chunck = byid[id];
      let dur = chunck.dur;

      // two digits == minutes, one digit == part of hour
      if (/\.\d{2}/.test(dur)) {
          dur = 60*~~(dur)+dur%1*100;
      } else {
          dur = 60*dur;
      }
      
      let anchorTo = anchorFrom.clone().add(dur, 'minutes');

      byid[id].from = anchorFrom;
      byid[id].to = anchorTo;

      byid[id]._id = id;

      anchorFrom = anchorTo;
    });
    
    let spare = '';
    if (nativeFrom) spare = buildSpare(anchorFrom, to);

    return {ids, byid, spare}
}

function buildSpare(start, end) {
  if (start && end) {
    return `${end.diff(start, 'hours')}h${end.diff(start, 'minutes')%60}m`
  } else {
    return '';
  }
}