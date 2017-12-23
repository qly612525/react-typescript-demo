import * as ol from 'openlayers';

export interface map {
    isOpen: boolean;
    mapObject: ol.Map;
    featureLayer: ol.layer.Vector;
}

export interface request {
    status: string;
}

export interface StoreState {
    map: map;
    request: request;
}