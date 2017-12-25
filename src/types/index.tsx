import * as ol from 'openlayers';

export interface map {
    isOpen: boolean;
    mapObject: ol.Map;
    featureLayer: ol.layer.Vector;
}

export interface request {
    editStatus: string;
    videos?: Array<any>;
    proload?: string;
    error?: string;
    isModify?: boolean;
}

export interface StoreState {
    map: map;
    request: request;
}