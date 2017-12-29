import { connect, Dispatch } from 'react-redux';
import * as React from 'react';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import { StoreState } from '../types';

import * as ol from 'openlayers';
import { catchMarker, getTestMarker, getMarker } from '../api/feature';

import { ThunkAction } from 'redux-thunk';

class Map extends React.PureComponent<any, any> {

    private isInit: boolean;
    private collection: ol.Collection<ol.Feature>;

    constructor(props: any) {
        super(props);
        this.isInit = false;
    }

    componentDidMount() {
        const { initMap, initFeatureLayer, mapObject, featureLayer } = this.props;
        const collection:ol.Collection<ol.Feature> = this.collection;
        // 初始化地图
        if (!mapObject) {
            initMap(collection);
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
            const collection = this.collection;
            // 获取数据
            getVideosAction(source, mapObject, collection);
            // 构建可拖拽交互

            // 增加地图事件初始化过程
            // mapObject.on('click', this.onFeatureClick);
            // mapObject.on('pointermove', this.onFeatureMouseMove);
            // mapObject.on('pointerdrag', this.onFeatureDrag);
            this.isInit = true;
        }
    }

    render() {
        // const { cameraState } = this.state;
        // const { isOpen, onEditEnd, editStatus } = this.props;
        // let btnVal = '提交';

        return (
            <div id="map" className="map"></div>
        );
    }
}