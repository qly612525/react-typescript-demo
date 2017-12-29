import { MapActions } from '../actions';
import { map } from '../types';
import { MAP_INIT, FEATURELAYER_INIT, START_EDIT, END_EDIT } from '../constants';
import initState from '../store/initState';

export function mapReducer(state: map = initState.map, action: MapActions): map {
    switch (action.type) {
        case MAP_INIT:
            return { ...state, mapObject: action.map, source: action.source, collection: action.collection };
    }
    return state;
}
