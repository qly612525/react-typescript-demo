import { connect, Dispatch } from 'react-redux';
import * as React from 'react';

import * as actions from '../actions';
import { StoreState } from '../types';

import * as ol from 'openlayers';

interface window {
    EzMap: (id: string, options?: {}) => void;
}

interface Props {
    isOpen?: boolean;
    onEditStart?: () => void;
    onEditEnd?: () => void;
}

class Map extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
                    })
                }),
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
                    })
                })
            ],
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [116, 39],
                zoom: 5
            })
        });
        const source = new ol.source.Vector();
        const layer = new ol.layer.Vector({ source: source });
        map.getLayers().getArray().push(layer);
        
        const feature = new ol.Feature({
            geometry: new ol.geom.Point([116,39])
        });

        const style = new ol.style.Style({
            image: new ol.style.Image({
                img: '/images/video.png',
                size: [20, 40],
                anchor: [0.5, 1]
            })
        });
        feature.setStyle(style);

        source.addFeature(feature);
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

function mapStateToProps({ map: { isOpen }}: StoreState) {
    return {
        isOpen,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.EditAction>) {
    return {
        onEditStart: () => dispatch(actions.startEdit()),
        onEditEnd: () => dispatch(actions.endEdit()),
    };
}

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Map);