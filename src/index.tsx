import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';

// import Hello from './containers/Hello';
import Map from './containers/MapContainer';
import configureStore from './store/configureStore';

const store = configureStore();
ReactDom.render(
    <Provider store={store}>
        <Map />
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);