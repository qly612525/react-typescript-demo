import * as ol from 'openlayers';

/**
 * 初始化地图对象，通过actionCreate将对象写入到store中，并不再修改store中的地图对象
 * 
 * @export
 */
export function mapInit(collection: ol.Collection<ol.Feature>): ol.Map {
    const translate = new ol.interaction.Translate({
        features: collection
    });
    const map = new ol.Map({
        interactions: ol.interaction.defaults().extend([translate]),
        target: 'map',
        layers: [
            // new ol.layer.Tile({
            //     source: new ol.source.XYZ({
            //         url: "http://41.188.33.196:8080/PGIS_S_TileMapServer/Maps/GDDH/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=0.3&key=",
            //         projection: 'EPSG:4326'
            //     })
            // })
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}",
                    // projection: 'EPSG:4326'
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [116, 39],
            maxZoom: 18,
            minZoom: 2,
            zoom: 5
        })
    });
    return map;
}

export function initialize() {
    const collection: ol.Collection<ol.Feature> = new ol.Collection();
    const translate = new ol.interaction.Translate({
        features: collection
    });
    const source = new ol.source.Vector();
    const map = new ol.Map({
        interactions: ol.interaction.defaults().extend([translate]),
        loadTilesWhileAnimating: true,
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://41.188.33.196:8080/PGIS_S_TileMapServer/Maps/GDDH/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=0.3&key=",
                    projection: 'EPSG:4326'
                })
            }),
            // new ol.layer.Tile({
            //     source: new ol.source.XYZ({
            //         url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}",
            //         // projection: 'EPSG:4326'
            //     })
            // }),
            new ol.layer.Vector({
                source: source
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [116, 39],
            maxZoom: 18,
            minZoom: 2,
            zoom: 9
        })
    });

    return {
        map, source, collection
    };
}