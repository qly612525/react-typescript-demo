import { createStore } from 'redux';
import reducers from '../reducers/index';
import { StoreState } from '../types';
import initState from './initState';

declare global {
    interface Window {
        devToolsExtension: any
    }
}

export default function () {
    const store = createStore(
        reducers,
        initState,
        window.devToolsExtension ? window.devToolsExtension() : f => f);
    return store;
}