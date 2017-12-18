import { startEditFn, endEditFn, StartEdit, EndEdit } from './mapactions';

export type EditAction = StartEdit | EndEdit;

export const startEdit = startEditFn;
export const endEdit = endEditFn;