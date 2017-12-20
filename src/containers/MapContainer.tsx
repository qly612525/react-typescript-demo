import { connect, Dispatch } from 'react-redux';
import * as React from 'react';

import * as actions from '../actions';
import { StoreState } from '../types';

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

import * as ol from 'openlayers';
import { catchMarker, getTestMarker } from '../api/feature';

const menuProps = {
    desktop: true,
    disableAutoFocus: true,
};

const colors = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Black',
    'White',
];

const styles = {
    appbar: {
        title: {
            cursor: 'pointer'
        }
    },
    text: {
        divder: {
            display: 'inline-block',
            width: '10%',
            textAlign: 'center'
        }
    },
    toggle: {
        label: {
            color: '#B6B6B6'
        }
    }
};

interface Props {
    isOpen?: boolean;
    mapObject?: ol.Map;
    featureLayer?: ol.layer.Vector;
    initMap?: () => ol.Map;
    initFeatureLayer?: () => ol.layer.Vector;
    onEditStart?: () => void;
    onEditEnd?: () => void;
}

class Map extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onFeatureClick = this.onFeatureClick.bind(this);
    }

    componentDidMount() { 
        const { initMap, initFeatureLayer, mapObject,featureLayer } = this.props;
        // 初始化地图
        if (!mapObject) {
            initMap();
        }
        // 添加要素图层
        if (!featureLayer) {
            initFeatureLayer();
        }
    }

    componentWillUpdate() {
        const { featureLayer, mapObject } = this.props;
        if (!featureLayer) {
            this.forceUpdate();
            return;
        }
        // 增加地图事件初始化过程
        mapObject.on('click', this.onFeatureClick);
        // 撒点到地图上
        const source = featureLayer.getSource();
        source.addFeatures(getTestMarker());
    }

    onFeatureMouseMove(evt: ol.MapBrowserEvent) { 
        
    }

    onFeatureClick(evt:ol.MapBrowserEvent) {
        const { mapObject, onEditStart } = this.props;
        const pixel = evt.pixel;
        const marker = catchMarker(pixel, mapObject);
        if (marker) {
            onEditStart();
        }
    }

    editView() { 
        const { isOpen } = this.props;
        if (isOpen) {
            return (
                <div className="map_editview"></div>
            );
        }
        return null;
    }

    render() {
        const { isOpen, onEditEnd } = this.props;
        return (
            <div className="mapwrapper">
                <Paper className="map_search" zDepth={2} >
                    <ActionSearch />
                    <AutoComplete
                        hintText="Search"
                        dataSource={colors}
                        menuProps={menuProps}
                        underlineShow={false}
                    />
                    <ContentForward />
                </Paper>  
                <div id="map" className="map"></div>
                <Drawer width={350} openSecondary={true} open={isOpen}>
                    <AppBar
                        title={<span style={styles.appbar.title}>视频编辑</span>}
                        iconElementLeft={<IconButton onClick={() => onEditEnd()}><NavigationClose /></IconButton>}
                    />
                    <Subheader>摄像头编号</Subheader>
                    <h2 className="map_cameraid">
                        {'111222333444555666'}
                    </h2>
                    <List>
                        <ListItem>
                            <TextField
                                hintText="名称"
                                floatingLabelText="摄像头名称"
                                fullWidth={true}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                hintText="地址"
                                floatingLabelText="摄像头地址"
                                fullWidth={true}
                                multiLine={true}
                                rows={1}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                hintText="经度"
                                floatingLabelText="摄像头经度"
                                style={{width: '45%'}}
                            />
                            <div style={styles.text.divder}>--</div>
                            <TextField
                                hintText="纬度"
                                floatingLabelText="摄像头纬度"
                                style={{ width: '45%' }}
                            />
                        </ListItem>
                        <ListItem>
                            <Toggle
                                label="是否标记为重点"
                                labelStyle={styles.toggle.label}
                            />
                        </ListItem>
                    </List>
                    <div className="map_btns">
                        <FlatButton label="重置" secondary={true} />
                        <RaisedButton label="提交" primary={true} />
                    </div>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps({ map: { isOpen, mapObject, featureLayer }}: StoreState) {
    return {
        isOpen, mapObject, featureLayer
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.EditAction>) {
    return {
        initMap: () => dispatch(actions.mapInit()),
        initFeatureLayer: () => dispatch(actions.featureLayerInit()),
        onEditStart: () => dispatch(actions.startEdit()),
        onEditEnd: () => dispatch(actions.endEdit()),
    };
}

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Map);