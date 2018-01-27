import moment from 'moment';
import { REBUILD_CHUNCKS, DECREASE } from '../constants/app.constant';

const initialState = {
  from: '',
  to: '',
  ids: [],
  byid: {}
};

let byid, ids;
export default (state = initialState, action) => {
  switch (action.type) {
    case REBUILD_CHUNCKS:
     ({byid, ids} = rebuildChuncks(action.ids, action.byid, state.from));
      return { ...state,
                ids: ids,
                byid: byid};
    default:
      return state;
  }
};

function rebuildChuncks(ids, byid, from) {
    //if given no start time, take system time and round it to five minutes
    if (!from) { 
      from = moment();
      const roundedUp = Math.ceil(moment(from).minute() / 5) * 5;
      from.minute(roundedUp).seconds(0);
    } 

    console.log(from.toString());

    ids.forEach((id) => {
      let chunck = byId[id];
      let dur = chunck.dur;
      let name = chunck.name;
    });

    return {ids, byid}
}