import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';
import VideoList from './containers/VideoList';
import configureStore from './store/configureStore';

const store = configureStore();
ReactDom.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <HashRouter>
                <div className="route-container">
                    <Route exact path="/" component={VideoList} />
                    <Route path="/map" component={App} />
                </div>
            </HashRouter>
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);