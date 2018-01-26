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
     ({byId, ids} = rebuildChuncks(action.byId, action.ids, state.from));
      return { ...state,
                ids: ids,
                byid: byid};
    default:
      return state;
  }
};

function rebuildChuncks(ids, byId, from) {
    return {ids, byid}
}