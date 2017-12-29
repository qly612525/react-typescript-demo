import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as ol from 'openlayers';

import Map from './Map';
import RightDrawer from './RightDrawer';

import { StoreState } from '../types';
import * as actions from '../actions';
import { catchMarker } from '../api/feature';

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.onFeatureClick = this.onFeatureClick.bind(this);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (nextProps.mapObject && !nextProps.videos) {
            nextProps.getVideos();
            // 定义地图事件
            const map = nextProps.mapObject;
            map.on('click', this.onFeatureClick);
            return false;
        } else if (nextProps.videos) { 
            nextProps.source.addFeatures(nextProps.videos);
            nextProps.collection.push(nextProps.videos[0]);
            nextProps.mapObject.render();
            return false;
        } else {
            return true;
        }
    }

    onFeatureClick(evt: ol.MapBrowserEvent) {
        const { mapObject, collection } = this.props;
        const pixel = evt.pixel;
        const marker = catchMarker(pixel, mapObject);
        if (marker) {
            collection.clear();
            collection.push(marker);
        }
    }

    render() {
        console.log('App：render');
        return (
            <div className="mapwrapper">
                <Map editing={1} />
            </div>
        );
    }

}

function mapStateToProps({map: {mapObject, source, collection}, request: {videos}}:StoreState) {
    return { mapObject, source, collection, videos };
}

function mapDispatchToProps(dispatch: Dispatch<any>) { 
    return {
        getVideos: bindActionCreators(actions.getVideos, dispatch)
    };
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);