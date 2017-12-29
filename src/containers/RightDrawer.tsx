import * as React from 'react';

import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentForward from 'material-ui/svg-icons/content/forward';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';

export default class RightDrawer extends React.Component<any, any> {
    render() {
        const { open, width, openSecondary } = this.props;
        return (
            <Drawer
                open={open}
                width={width}
                openSecondary={openSecondary}
            >
            </Drawer>
        );
    }
}