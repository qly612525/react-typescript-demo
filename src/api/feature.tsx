import * as ol from 'openlayers';

export function getIcon(src: string, size: ol.Size, anchor:number[]): ol.style.Icon {
    if(!src) throw new Error('图片地址不能为空！');
    return new ol.style.Icon({ src, size, anchor });
}

export function initFeatureLayer(): ol.layer.Vector {
    const layer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    return layer;
}

export function addLayerToMap(layer: ol.layer.Base, map: ol.Map): void {
    if (!layer || !map) throw new Error('加载的图层和地图对象都不能为空！');
    const layers = map.getLayers().getArray();
    layers.push(layer);
}

export function getTestMarker(): ol.Feature[] {
    const icon = getIcon('/images/marker.png', [48, 48], [0.5, 1]);
    const style = new ol.style.Style({
        image: icon
    });
    const mark = new ol.Feature({
        geometry: new ol.geom.Point([116, 40])
    });
    mark.setStyle(style);
    return [mark];
}