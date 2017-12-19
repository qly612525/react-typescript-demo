import { connect, Dispatch } from 'react-redux';
import * as React from 'react';

import * as actions from '../actions';
import { StoreState } from '../types';

import * as ol from 'openlayers';
import { getTestMarker } from '../api/feature';

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
            // this.forceUpdate();
        }
    }

    componentWillUpdate() {
        const { featureLayer } = this.props;
        if (!featureLayer) {
            this.forceUpdate();
            return;
        }
        // 撒点到地图上
        const source = featureLayer.getSource();
        source.addFeatures(getTestMarker());
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
        const { onEditStart, onEditEnd } = this.props;
        return (
            <div id="map" className="map">
                {this.editView()}
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