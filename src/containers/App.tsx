import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as ol from 'openlayers';

import Map from './Map';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';


import { StoreState } from '../types';
import * as actions from '../actions';
import { getMarker } from '../api/feature';

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

class App extends React.Component<any, any> {

    private _init: boolean = true;
    private _mark: ol.geom.Point;

    constructor(props: any) {
        super(props);
        this.state = { x: 0, y: 0 };
        this.onGeomChange = this.onGeomChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReturn = this.onReturn.bind(this);
        // this.onFeatureClick = this.onFeatureClick.bind(this);
    }

    componentDidMount() {
        setTimeout(() => { 
            this.addFeature();
        },1000);
    }

    addFeature() {
        const { mapObject, source, collection, videos, current } = this.props;
        if (this._init && mapObject && source && videos && current !== null) {
            // source.clear();
            // collection.clear();
            const mark = getMarker(videos[current]);
            const geom = this._mark = mark.getGeometry() as ol.geom.Point;
            geom.on('change', this.onGeomChange);
            const [x, y] = geom.getCoordinates();
            const view = mapObject.getView();
            view.animate({ zoom: 18 }, { center: [x, y] }, { duration: 3000 });
            source.addFeature(mark);
            collection.push(mark);
            this._init = false;
            this.setState({ x, y });
        }
    }

    onGeomChange(evt: any) {
        const [x, y] = evt.target.getCoordinates();
        this.setState({ x, y });
    }

    onReturn() {
        const { clearVideos, source, collection, history } = this.props;
        clearVideos();
        source.clear();
        collection.clear();
        this._mark.un('change', this.onGeomChange);
        this._mark = null;
        history.push('/');
    }

    onSubmit() {
        const { clearVideos, source, collection, updateVideo, videos, current, history } = this.props;
        const { x, y } = this.state;
        const info = { ...videos[current], x, y };
        updateVideo(info);
        clearVideos();
        source.clear();
        collection.clear();
        this._mark.un('change', this.onGeomChange);
        this._mark = null;
        history.push('/');
    }

    render() {
        const { videos, current, history } = this.props;
        if (videos === null || current === null) history.push('/');
        const video = videos[current];
        return (
            <div className="mapwrapper">
                <Map editing={1} />
                <Drawer
                    openSecondary={true}    
                >
                    <AppBar
                        title={<span style={styles.appbar.title}>视频编辑</span>}    
                    />    
                    <Subheader>摄像头名称</Subheader>
                    <h2 className="map_cameraid">{video.name}</h2>
                    <List>
                        <ListItem>
                            <TextField
                                hintText="经度"
                                floatingLabelText="摄像头经度"
                                fullWidth={true}
                                value={this.state.x}
                            />
                            <TextField
                                hintText="纬度"
                                floatingLabelText="摄像头纬度"
                                fullWidth={true}
                                value={this.state.y}
                            />
                        </ListItem>
                    </List>
                    <div className="map_btns">
                        <FlatButton onClick={this.onReturn} label="返回" secondary={true} />
                        <RaisedButton onClick={this.onSubmit} label="提交" primary={true} />
                    </div>
                </Drawer>    
            </div>
        );
    }

}

function mapStateToProps({ map: { mapObject, source, collection }, video: { current, videos } }: StoreState) {
    return { mapObject, source, collection, current, videos };
}

function mapDispatchToProps(dispatch: Dispatch<any>) { 
    return {
        clearVideos: () => dispatch(actions.clearVideos()),
        updateVideo: bindActionCreators(actions.videoUpdate, dispatch),
    };
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);