import { Dispatch } from 'redux';

import * as constants from '../constants';
import { initialize } from '../api/mapInit';

export interface MapInit {
    type: constants.MAP_INIT;
    map: ol.Map;
    source: ol.source.Vector;
    collection: ol.Collection<ol.Feature>;
}

export function initializeFn() { 
    const { map, source, collection } = initialize();
    return { type: constants.MAP_INIT, map, source, collection };
};