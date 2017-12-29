import * as ol from 'openlayers';

export interface IDragFeature extends ol.interaction.Pointer {
    coordinate_: ol.Pixel;
    cursor_: string | undefined;
    feature_: ol.Feature;
    previousCursor_: string | undefined;
}

export default class DragFeature extends ol.interaction.Pointer {
    
    private coordinate_: ol.Pixel = null;
    private cursor_: string | undefined = 'pointer';
    private feature_: ol.Feature = null;
    private previousCursor_: string | undefined = undefined;
    
    constructor() {
        super({
            handleDownEvent: DragFeature.prototype.handleDownEvent,
            handleDragEvent: DragFeature.prototype.handleDragEvent,
            handleMoveEvent: DragFeature.prototype.handleMoveEvent,
            handleUpEvent: DragFeature.prototype.handleUpEvent
        })
    }

    handleDownEvent(evt: ol.MapBrowserEvent) {
        const map = evt.map;

        const feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });

        if (feature) {
            this.coordinate_ = evt.coordinate;
            this.feature_ = feature as ol.Feature;
        }

        return !!feature;
    }

    handleDragEvent(evt: ol.MapBrowserEvent) {
        const map = evt.map;

        const feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });

        const deltaX = evt.coordinate[0] - this.coordinate_[0];
        const deltaY = evt.coordinate[1] - this.coordinate_[1];

        const geometry = (this.feature_.getGeometry() as ol.geom.SimpleGeometry);
        geometry.translate(deltaX, deltaY);

        this.coordinate_[0] = evt.coordinate[0];
        this.coordinate_[1] = evt.coordinate[1];

        return false;
    }

    handleMoveEvent(evt: ol.MapBrowserEvent) {
        if (this.cursor_) {
            const map = evt.map;
            const feature = map.forEachFeatureAtPixel(evt.pixel,
                function (feature, layer) {
                    return feature;
                });
            const element = evt.map.getTargetElement() as HTMLElement;
            if (feature) {
                if (element.style.cursor != this.cursor_) {
                    this.previousCursor_ = element.style.cursor;
                    element.style.cursor = this.cursor_;
                }
            } else if (this.previousCursor_ !== undefined) {
                element.style.cursor = this.previousCursor_;
                this.previousCursor_ = undefined;
            }
        }
        return false;
    }

    handleUpEvent(evt: ol.MapBrowserEvent) {
        this.coordinate_ = null;
        this.feature_ = null;
        return false;
    }
}