import * as ol from 'openlayers';

export default {
    map: {
        mapObject: null,
        source: null,
        collection: new ol.Collection() as ol.Collection<ol.Feature>,
    },
    video: {
        videos: null,
        current: null,
    }
};
