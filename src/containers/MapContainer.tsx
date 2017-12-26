import { connect, Dispatch } from 'react-redux';
import * as React from 'react';
import { bindActionCreators } from 'redux';

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
import { catchMarker, getTestMarker, getMarker } from '../api/feature';

import { ThunkAction } from 'redux-thunk';

const menuProps = {
    desktop: true,
    disableAutoFocus: true,
};

const styles = {
    appbar: {
        title: {
            cursor: 'pointer'
        }
    },
    text: {
        divder: {
            display: 'inline-block',
            width: '4%',
            textAlign: 'center'
        },
        btn: {
            display: 'inline-block',
            width: '16%',
            textAlign: 'center'
        }
    },
    toggle: {
        label: {
            color: '#B6B6B6'
        }
    }
};

interface cameraState {
    did: string;
    name: string;
    address: string;
    x: string;
    y: string;
    flag: boolean;
    isModify: boolean;
}

interface State {
    cameraState?: cameraState;
}

interface Props {
    isOpen?: boolean;
    mapObject?: ol.Map;
    featureLayer?: ol.layer.Vector;
    videos?: Array<ol.Feature>;
    initMap?: () => ol.Map;
    initFeatureLayer?: () => ol.layer.Vector;
    onEditStart?: () => void;
    onEditEnd?: () => void;
    thunkTestAction?: (did: string, body: any, marker: ol.Feature, map: ol.Map) => ThunkAction<Promise<string>, any, null>;
    getVideosAction?: (s: ol.source.Vector, map: ol.Map) => ThunkAction<Promise<any>, any, null>;
}

interface Request {
    editStatus?: string;
    isModify?: boolean;
}

class Map extends React.PureComponent<Props & Request, State> {

    private originState: cameraState;
    private collection: ol.Collection<ol.Feature>;
    private mark: ol.Feature;
    private isInit: boolean;

    constructor(props: Props) {
        super(props);
        this.isInit = false;
        this.state = {
            cameraState: {
                did: '',
                name: '',
                address: '',
                flag: false,
                isModify: false,
                x: '',
                y: '',
            }
        };
        this.onFeatureClick = this.onFeatureClick.bind(this);
        this.onFeatureMouseMove = this.onFeatureMouseMove.bind(this);
        // this.onFeatureDrag = this.onFeatureDrag.bind(this);
        this.onLoaction = this.onLoaction.bind(this);
        this.onCancleClick = this.onCancleClick.bind(this);
        this.onFetch = this.onFetch.bind(this);
    }

    componentDidMount() {
        const { initMap, initFeatureLayer, mapObject, featureLayer } = this.props;
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
        const { featureLayer, mapObject, getVideosAction, videos } = this.props;
        if (!featureLayer) {
            this.forceUpdate();
            return;
        }
        
        if (featureLayer && !this.isInit) {
            console.log("update");
            const source = featureLayer.getSource();
            // 获取数据
            getVideosAction(source, mapObject);
            // 构建可拖拽交互
            const collection: ol.Collection<ol.Feature> = this.collection= new ol.Collection();
            const translate = new ol.interaction.Translate({
                features: collection
            });
            mapObject.addInteraction(translate);
            // 增加地图事件初始化过程
            mapObject.on('click', this.onFeatureClick);
            mapObject.on('pointermove', this.onFeatureMouseMove);
            // mapObject.on('pointerdrag', this.onFeatureDrag);
            this.isInit = true;
        }
    }

    updateMarkerStatus() {
        const { mapObject, isModify, onEditEnd } = this.props;
        if (isModify) {
            const collection: ol.Collection<ol.Feature> = this.collection;
            const marker = this.mark;
            collection.clear();
            const style = new ol.style.Style({ image: marker.get('markerModifyIcon') });
            marker.setStyle(style);
            onEditEnd();
        }
     }

    onInputChange(input: any, classMeta: string): cameraState {
        const { cameraState } = this.state;
        const state = {
            did: cameraState.did,
            name: cameraState.name,
            address: cameraState.address,
            x: cameraState.x,
            y: cameraState.y,
            flag: cameraState.flag,
            isModify: cameraState.isModify
        };
        return state;
    }

    onLoaction() {
        const marker = this.mark;
        const { mapObject } = this.props;
        const { cameraState } = this.state;
        if (marker) {
            const coords:ol.Coordinate = [parseFloat(cameraState.x), parseFloat(cameraState.y)];
            (marker.getGeometry() as ol.geom.Point).setCoordinates(coords);
            mapObject.renderSync();
        }
    }

    onFeatureMouseMove(evt: ol.MapBrowserEvent) {
        const { mapObject } = this.props;
        const { cameraState } = this.state;
        const pixel = evt.pixel;
        const coords = evt.coordinate;
        const marker = catchMarker(pixel, mapObject) as ol.Feature;
        const viewport = mapObject.getViewport() as HTMLElement;
        if (marker) {
            viewport.style.cursor = 'pointer';
            // 更新坐标
            const coords: ol.Coordinate = (marker.getGeometry() as ol.geom.Point).getCoordinates();
            this.setState({
                cameraState:
                    { ...cameraState, x: coords[0].toString(), y: coords[1].toString() }
            });
        } else {
            viewport.style.cursor = '';
        }
    }

    onFeatureDrag(evt: ol.MapBrowserEvent) {
        const { mapObject } = this.props;
        const { cameraState } = this.state;
        const pixel = evt.pixel;
        const marker = catchMarker(pixel, mapObject) as ol.Feature;
        const viewport = mapObject.getViewport() as HTMLElement;
        if (marker) {
            viewport.style.cursor = 'pointer';
            // 更新坐标
            const coords: ol.Coordinate = (marker.getGeometry() as ol.geom.Point).getCoordinates();
            this.setState({
                cameraState:
                    { ...cameraState, x: coords[0].toString(), y: coords[1].toString() }
            });
        } else {
            viewport.style.cursor = '';
        }
    }

    onFeatureClick(evt:ol.MapBrowserEvent) {
        const { mapObject, onEditStart } = this.props;
        const pixel = evt.pixel;
        const marker = this.mark = catchMarker(pixel, mapObject) as ol.Feature;
        if (marker) {
            // 打开drawer
            onEditStart();

            const info = { ...marker.get('cameraInfo') };
            info['x'] = info['o_x'];
            delete info['o_x'];
            info['y'] = info['o_y'];
            delete info['o_y'];

            // 更改marker颜色，增加可拖拽交互
            const style = new ol.style.Style({ image: marker.get('markerModifingIcon') });
            marker.setStyle(style);

            // 添加到可拖拽集合中
            const collection: ol.Collection<ol.Feature> = this.collection;
            collection.push(marker);
            
            // 地图按照该修改点坐标，缩放到18级
            const centerPoint = (marker.getGeometry() as ol.geom.Point).getCoordinates();
            const view = mapObject.getView();
            view.animate({ zoom: 18 , center: centerPoint, duration: 2000 });

            this.originState = info;
            this.setState({ cameraState: info });
        }
    }

    onCancleClick() {
        const cameraState = this.originState;
        this.setState({ cameraState });
    }

    onFetch() {
        const { thunkTestAction, onEditEnd, mapObject } = this.props;
        const { cameraState } = this.state;
        const marker = this.mark;
        const { did, name, address, x, y } = cameraState;
        thunkTestAction(did, { name, address, x, y, updateTime: new Date(), isModify: true }, marker, mapObject);
        onEditEnd();
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
        const { cameraState } = this.state;
        const { isOpen, onEditEnd, editStatus } = this.props;
        let btnVal = '提交';
        this.updateMarkerStatus();

        return (
            <div className="mapwrapper">
                {/* <Paper className="map_search" zDepth={2} >
                    <ActionSearch />
                    <AutoComplete
                        hintText="Search"
                        dataSource={colors}
                        menuProps={menuProps}
                        underlineShow={false}
                    />
                    <ContentForward />
                </Paper>   */}
                <div id="map" className="map"></div>
                <Drawer width={350} openSecondary={true} open={isOpen}>
                    <AppBar
                        title={<span style={styles.appbar.title}>视频编辑</span>}
                        iconElementLeft={<IconButton onClick={() => onEditEnd()}><NavigationClose /></IconButton>}
                    />
                    <form action={'/test'} method="post">
                        <Subheader>摄像头编号</Subheader>
                        <h2 className="map_cameraid">
                            {cameraState.did}
                        </h2>
                        <List>
                            <ListItem>
                                <TextField
                                    hintText="名称"
                                    floatingLabelText="摄像头名称"
                                    fullWidth={true}
                                    value={cameraState.name}
                                    onChange={(event, val) => {
                                        this.setState({ cameraState: { ...cameraState, name:val } })
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    hintText="地址"
                                    floatingLabelText="摄像头地址"
                                    fullWidth={true}
                                    multiLine={true}
                                    rows={1}
                                    value={cameraState.address}
                                    onChange={(event, val) => {
                                        this.setState({ cameraState: { ...cameraState, address: val } })
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    hintText="经度"
                                    floatingLabelText="摄像头经度"
                                    style={{ width: '40%' }}
                                    value={cameraState.x}
                                    onChange={(event, val) => {
                                        this.setState({ cameraState: { ...cameraState, x: val } })
                                    }}
                                />
                                <div style={styles.text.divder}>-</div>
                                <TextField
                                    hintText="纬度"
                                    floatingLabelText="摄像头纬度"
                                    style={{ width: '40%' }}
                                    value={cameraState.y}
                                    onChange={(event, val) => {
                                        this.setState({ cameraState: { ...cameraState, y: val } })
                                    }}
                                />
                                <div style={styles.text.btn}>
                                    <FlatButton label="定位" primary={true} onClick={this.onLoaction}/>
                                </div>
                            </ListItem>
                            {/* <ListItem>
                                <Toggle
                                    label="是否标记为重点"
                                    labelStyle={styles.toggle.label}
                                    toggled={cameraState.flag}
                                    onToggle={() => {
                                        this.setState({cameraState: {...cameraState, flag: !cameraState.flag}})
                                    }}
                                />
                            </ListItem> */}
                        </List>
                        <div className="map_btns">
                            <FlatButton label="重置" secondary={true} onClick={this.onCancleClick} />
                            <RaisedButton label={btnVal} primary={true} onClick={this.onFetch} />
                        </div>
                    </form>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps({ map: { isOpen, mapObject, featureLayer }, request: { isModify, editStatus, videos }}: StoreState) {
    return {
        isOpen, mapObject, featureLayer, isModify, editStatus, videos
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        initMap: () => dispatch(actions.mapInit()),
        initFeatureLayer: () => dispatch(actions.featureLayerInit()),
        onEditStart: () => dispatch(actions.startEdit()),
        onEditEnd: () => dispatch(actions.endEdit()),
        thunkTestAction: bindActionCreators(actions.thunkTestAction, dispatch),
        getVideosAction: bindActionCreators(actions.videoFetch, dispatch),
    };
}

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Map);