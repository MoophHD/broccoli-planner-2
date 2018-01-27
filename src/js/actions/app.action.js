import { 
  REBUILD_CHUNCKS,
  SET_FROM_TIME,
  SET_TO_TIME } from '../constants/app.constant';

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