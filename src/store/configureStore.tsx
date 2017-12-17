import { createStore } from 'redux';
import reducers from '../reducers';
import { StoreState } from '../types';
import initState from './initState';

export default function () {
    const store = createStore(reducers, initState);
    return store;
}