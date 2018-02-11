import { 
    SET_VALUE,
    SET_FROM,
    SET_TO,
    SET_NOTES
} from '../constants/memory.constant';
  
export function setValue(value) {
    return {
        type: SET_VALUE,
        payload: value
    };
}

export function setNotes(value) {
    return {
        type: SET_NOTES,
        payload: value
    };
}

export function setFrom(value) {
    return {
        type: SET_FROM,
        payload: value
    };
}

export function setTo(value) {
    return {
        type: SET_TO,
        payload: value
    };
}

