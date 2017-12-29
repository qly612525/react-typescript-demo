// import { mapInitFn, featureLayerInitFn, startEditFn, endEditFn, MapInit, FeatureLayerInit, StartEdit, EndEdit } from './mapactions';
import { Fetch, VideoFetch, thunkTestActionFn, videoFetchFn } from './request';
import { MapInit, initializeFn, getVideosFn } from './map';

// export type EditAction = MapInit | FeatureLayerInit | StartEdit | EndEdit;

// export const mapInit = mapInitFn;
// export const featureLayerInit = featureLayerInitFn;
// export const startEdit = startEditFn;
// export const endEdit = endEditFn;

export type FetchAction = Fetch | VideoFetch;
export const thunkTestAction = thunkTestActionFn;
export const videoFetch = videoFetchFn;

export type MapActions = MapInit;
export const initialize = initializeFn;
export const getVideos = getVideosFn;