import { EditAction } from '../actions';
import { map } from '../types';
import { MAP_INIT, FEATURELAYER_INIT, START_EDIT, END_EDIT } from '../constants';
import initState from '../store/initState';

import { mapInit } from '../api/mapInit';
import { initFeatureLayer, addLayerToMap } from '../api/feature';

export function mapReducer(state: map = initState.map, action: EditAction): map {
    switch (action.type) {
        case MAP_INIT:
            const map = mapInit();
            return { ...state, mapObject: map };
        case FEATURELAYER_INIT:
            const layer = initFeatureLayer();
            const { mapObject } = state;
            addLayerToMap(layer, mapObject);
            return { ...state, featureLayer: layer };
        case START_EDIT:
            return { ...state, isOpen: true };
        case END_EDIT:
            return { ...state, isOpen: false };
    }
    return state;
}
