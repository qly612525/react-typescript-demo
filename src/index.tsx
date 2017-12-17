import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Hello from './containers/Hello';
import configureStore from './store/configureStore';

const store = configureStore();
ReactDom.render(
    <Provider store={store}>
        <Hello name="123" />
    </Provider>    
    ,
    document.getElementById('root') as HTMLElement
);