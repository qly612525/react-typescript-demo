import { EditAction } from '../actions';
import { map } from '../types';
import { START_EDIT, END_EDIT } from '../constants';
import initState from '../store/initState';

export function mapReducer(state: map = initState.map, action: EditAction): map {
    switch (action.type) {
        case START_EDIT:
            return { ...state, isOpen: true };
        case END_EDIT:
            return { ...state, isOpen: false };
    }
    return state;
}
