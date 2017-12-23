import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import { StoreState } from '../types';
import initState from './initState';

declare global {
    interface Window {
        devToolsExtension: any
    }
}

const middlewares = [thunk];
const devToolsExtension = window.devToolsExtension ? window.devToolsExtension() : (f: any) => f;

export default function () {
    const store = createStore(
        reducers,
        initState,
        compose(applyMiddleware(...middlewares), devToolsExtension),
    );
    return store;
}