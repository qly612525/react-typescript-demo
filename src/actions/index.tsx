// import { mapInitFn, featureLayerInitFn, startEditFn, endEditFn, MapInit, FeatureLayerInit, StartEdit, EndEdit } from './mapactions';
import { MapInit, initializeFn, getVideosFn } from './map';
import { VideoFetch, videoFetchFn } from './videos';

// export type EditAction = MapInit | FeatureLayerInit | StartEdit | EndEdit;

// export const mapInit = mapInitFn;
// export const featureLayerInit = featureLayerInitFn;
// export const startEdit = startEditFn;
// export const endEdit = endEditFn;

export type FetchAction = VideoFetch;
export const videoFetch = videoFetchFn;

export type MapActions = MapInit;
export const initialize = initializeFn;
export const getVideos = getVideosFn;