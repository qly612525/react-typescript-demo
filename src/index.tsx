import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Map from './containers/MapContainer';
import configureStore from './store/configureStore';

const store = configureStore();
ReactDom.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Map />
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);