import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';
import VideoList from './containers/VideoList';
import configureStore from './store/configureStore';

const store = configureStore();
ReactDom.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={VideoList} />
                    <Route exact path="/map" component={App} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);