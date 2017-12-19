import * as constants from '../constants';

export interface MapInit {
    type: constants.MAP_INIT;
}

export interface FeatureLayerInit {
    type: constants.FEATURELAYER_INIT;
}

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

export function mapInitFn(): MapInit {
    return {
        type: constants.MAP_INIT
    }
}

export function featureLayerInitFn(): FeatureLayerInit {
    return {
        type: constants.FEATURELAYER_INIT
    }
}