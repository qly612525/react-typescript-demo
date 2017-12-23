import { mapInitFn, featureLayerInitFn, startEditFn, endEditFn, MapInit, FeatureLayerInit, StartEdit, EndEdit } from './mapactions';
import { Fetch, thunkTestActionFn } from './request';

export type EditAction = MapInit | FeatureLayerInit | StartEdit | EndEdit;

export const mapInit = mapInitFn;
export const featureLayerInit = featureLayerInitFn;
export const startEdit = startEditFn;
export const endEdit = endEditFn;

export type FetchAction = Fetch;
export const thunkTestAction = thunkTestActionFn;
