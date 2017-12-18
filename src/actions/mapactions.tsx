import * as constants from '../constants';

export interface StartEdit {
    type: constants.START_EDIT;
}

export interface EndEdit {
    type: constants.END_EDIT;
}

export function startEditFn(): StartEdit {
    return {
        type: constants.START_EDIT
    }
}

export function endEditFn(): EndEdit {
    return {
        type: constants.END_EDIT
    }
}