import * as constants from '../constants';
import * as axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

// 异步
export interface FetchNo {
    type: constants.FETCH_NO;
}

export interface FetchRequest {
    type: constants.FETCH_REQUEST;
}

export interface FetchSuccess {
    type: constants.FETCH_SUCCESS;
}

export interface FetchError {
    type: constants.FETCH_ERROR;
}

export type Fetch = FetchNo | FetchRequest | FetchSuccess | FetchError;
type thunkTestAction = (time: number) => (dispatch: Dispatch<any>) => void;
export const thunkTestActionFn:thunkTestAction = (time: number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({type: constants.FETCH_REQUEST});
        try {
            setTimeout(() => {
                dispatch({ type: constants.FETCH_SUCCESS, preload: [1,2,3] });
            }, time);
        } catch (error) {
            dispatch({ type: constants.FETCH_ERROR, preload: error.toString() });
        }
    }
}