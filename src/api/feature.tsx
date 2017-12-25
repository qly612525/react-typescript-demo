import * as ol from 'openlayers';
import axios from 'axios';

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
    const icon1 = getIcon('/images/marker.png', [48, 48], [0.5, 1]);
    const style1 = new ol.style.Style({
        image: icon1
    });
    const mark1 = new ol.Feature({
        geometry: new ol.geom.Point([116, 40])
    });
    mark1.set('cameraInfo', {
        id: '111222333444555666',
        name: 'testname',
        address: 'testaddress',
        x: 0.1,
        y: 0.1,
        flag: false
    });
    mark1.setStyle(style1);
    const icon2 = getIcon('/images/marker.png', [48, 48], [0.5, 1]);
    const style2 = new ol.style.Style({
        image: icon2
    });
    const mark2 = new ol.Feature({
        geometry: new ol.geom.Point([115, 40])
    });
    mark2.set('cameraInfo', {
        id: '111222333444555999',
        name: 'tee',
        address: 'address',
        x: 115.1,
        y: 40.1,
        flag: true
    });
    mark2.setStyle(style2);
    return [mark1, mark2];
}

export function getVideosData(): Promise<any> {
    return axios.get('/video/list');
}

export function getMarker(info: any): ol.Feature {
    let icon, coords: ol.Coordinate;
    const markerIcon = getIcon('/images/marker.png', [36, 36], [0.5, 1]);
    const markerModifyIcon = getIcon('/images/marker_modify.png', [36, 36], [0.5, 1]);
    const markerModifingIcon = getIcon('/images/marker_modifing.png', [36, 36], [0.5, 1]);

    if (info['is_modify']) {
        icon = markerModifyIcon;
        coords = [parseFloat(info['n_x']), parseFloat(info['n_y'])];
    } else {
        icon = markerIcon;
        coords = [parseFloat(info['o_x']), parseFloat(info['o_y'])] || [0, 0];
    }

    const style = new ol.style.Style({
        image: icon
    });

    const mark = new ol.Feature({
        geometry: new ol.geom.Point(coords)
    });
    mark.set('cameraInfo', info);
    mark.setStyle(style);
    // marker存储icon对象
    mark.set('markerIcon', markerIcon);
    mark.set('markerModifyIcon', markerModifyIcon);
    mark.set('markerModifingIcon', markerModifingIcon);

    return mark;
}

export function getVideos(list: Array<any>): ol.Feature[] {
    return list.map((info) => getMarker(info));
}

export function updateVideo(did:string, body: any): Promise<any> { 
    return axios.post(`/video/${did}`, body);
}