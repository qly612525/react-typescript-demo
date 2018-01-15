import * as ol from 'openlayers';

export interface map {
    mapObject: ol.Map;
    source: ol.source.Vector;
    collection: ol.Collection<ol.Feature>;
}

export interface video {
    // editStatus: string;
    videos?: Array<any>;
    // proload?: string;
    error?: string;
    current: any;
    // isModify?: boolean;
}

export interface StoreState {
    map: map;
    video: video;
}