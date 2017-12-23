import { FetchAction } from '../actions';
import { request } from '../types';
import { FETCH_NO, FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from '../constants';
import initState from '../store/initState';

export function requestReducer(state: request = initState.request, action:FetchAction): request {
    switch (action.type) {
        case FETCH_NO:
            return { ...state, status: 'no' };
        case FETCH_REQUEST:
            return { ...state, status: 'loading' };
        case FETCH_SUCCESS:
            return { ...state, status: 'success' };
        case FETCH_ERROR:
            return { ...state, status: 'error' };
    }
    return state;
}