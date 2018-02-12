import { 
  REBUILD_CHUNCKS,
  SET_FROM_TIME,
  SET_TO_TIME,
  SET_CURRENT,
  CLEAR_CURRENT} from '../constants/app.constant';

export function rebuildChuncks(ids, byid) {
  return {
    type: REBUILD_CHUNCKS,
    ids: ids,
    byid: byid
  };
}

export function setFromTime(time) {
  return {
    type: SET_FROM_TIME,
    payload: time
  };
}

export function setToTime(time) {
  return {
    type: SET_TO_TIME,
    payload: time
  };
}

export function setCurrent(id) {
  return {
    type: SET_CURRENT,
    payload: id
  };
}

export function clearCurrent() {
  return {
    type: CLEAR_CURRENT
  }
}