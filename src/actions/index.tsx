// import { mapInitFn, featureLayerInitFn, startEditFn, endEditFn, MapInit, FeatureLayerInit, StartEdit, EndEdit } from './mapactions';
import { MapInit, initializeFn } from './map';
import {
    VideoFetch, VideoSetCurrent, VideoClear, VideoUpdate,
    videoFetchFn, setCurrentFn, clearVideosFn, videoUpdateFn
} from './videos';

// export type EditAction = MapInit | FeatureLayerInit | StartEdit | EndEdit;

// export const mapInit = mapInitFn;
// export const featureLayerInit = featureLayerInitFn;
// export const startEdit = startEditFn;
// export const endEdit = endEditFn;

export type FetchAction = VideoFetch;
export const videoFetch = videoFetchFn;
export type CurrentAction = VideoSetCurrent;
export const setCurrent = setCurrentFn;
export type VideoClearAction = VideoClear;
export const clearVideos = clearVideosFn;
export type UpdateAction = VideoUpdate;
export const videoUpdate = videoUpdateFn;

export type MapActions = MapInit;
export const initialize = initializeFn;