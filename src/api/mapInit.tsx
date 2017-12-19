import * as ol from 'openlayers';

/**
 * 初始化地图对象，通过actionCreate将对象写入到store中，并不再修改store中的地图对象
 * 
 * @export
 */
export function mapInit(): ol.Map {
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
    return map;
}