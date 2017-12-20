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

/**
 * 基于地图容器事件捕捉marker要素，如果该像素位置有要素就返回该要素，否则返回null
 * 
 * @export
 * @param {ol.Pixel} pixel 
 * @param {ol.Map} map
 * @param {*} metaClass 
 * @returns {(ol.Feature | ol.render.Feature)} 
 */
export function catchMarker(pixel: ol.Pixel, map: ol.Map, metaClass: any = ol.Feature): ol.Feature | ol.render.Feature {
    let mark = null;
    try {
        mark = map.forEachFeatureAtPixel(pixel, (f) => {
            if (f instanceof metaClass) return f;
        });
    } catch (error) {
        throw (error);
    }
    return mark;
}

/**
 * 测试marker的Mask接口
 * 
 * @export
 * @returns {ol.Feature[]} 
 */
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