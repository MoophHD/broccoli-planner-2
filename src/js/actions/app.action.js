import { REBUILD_CHUNCKS } from '../constants/app.constant';

export function rebuildChuncks(ids, byid) {
  return {
    type: REBUILD_CHUNCKS,
    ids: ids,
    byid: byid
  };
}