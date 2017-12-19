import { mapInitFn, featureLayerInitFn, startEditFn, endEditFn, MapInit,FeatureLayerInit, StartEdit, EndEdit } from './mapactions';

export type EditAction = MapInit | FeatureLayerInit | StartEdit | EndEdit;

export const mapInit = mapInitFn;
export const featureLayerInit = featureLayerInitFn;
export const startEdit = startEditFn;
export const endEdit = endEditFn;
