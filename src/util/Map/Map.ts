import * as ol from "ol";
import * as ol_control from "ol/control";
import * as ol_coordinate from "ol/coordinate";
import * as ol_layer from "ol/layer";
import * as ol_source from "ol/source";

import * as ol_interaction from "ol/interaction";
import * as ol_proj from "ol/proj";

import * as ol_geom from "ol/geom";
import * as ol_style from "ol/style";

interface IOptions {
    el: HTMLElement | string;
}

export default class MapUtil {
    /**
     * 地图实例
     */
    baseMap;
    /**
     * 视图
     */
    view;
    /**
     * 地图层
     */
    baseLayer;

    /**
     *  移动 point 矢量层
     */
    movePointVectorLayer;

    constructor(options: IOptions) {
        /**
         * baseMap 控制器
         */
        const controls = ol_control
            .defaults({
                attribution: false,
            })
            .extend([
                new ol_control.MousePosition({
                    coordinateFormat: ol_coordinate.createStringXY(4),
                }),
            ])
            .extend([new ol_control.ZoomSlider()]);

        this.view = new ol.View({
            center: ol_proj.fromLonLat([114.51517, 38.08402]),
            zoom: 13,
        });

        this.baseLayer = new ol_layer.Tile({
            // source: new ol_source.OSM(),
            source: new ol_source.XYZ({
                url: "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
            }),
        });

        this.movePointVectorLayer = new ol_layer.Vector({
            source: new ol_source.Vector({
                features: [],
            }),
        });

        this.baseMap = new ol.Map({
            target: options.el,
            layers: [this.baseLayer, this.movePointVectorLayer],
            controls,
            view: this.view,
        });

        const draw = new ol_interaction.Draw({
            type: "Polygon",
            geometryName: "123",
            source: this.movePointVectorLayer.getSource()!,
        });
        draw.on("drawend", (e) => {
            console.log(e.feature.getGeometry());
        });
        this.baseMap.addInteraction(draw);
        this.baseMap.addInteraction(
            new ol_interaction.Snap({
                source: this.movePointVectorLayer.getSource()!,
            }),
        );
    }

    addMovePoint({ icon }: { icon: any }) {
        const mpvl_source = this.movePointVectorLayer.getSource();
        const geom = new ol_geom.Point(ol_proj.fromLonLat([114.51517, 38.08402]));
        const mpvl_f = new ol.Feature(geom);

        function createStyle(src?: string, img?: any) {
            return new ol_style.Style({
                image: new ol_style.Icon({
                    anchor: [0.5, 0.96],
                    crossOrigin: "anonymous",
                    src: src,
                    img: img,
                    imgSize: img ? [img.width, img.height] : undefined,
                }),
            });
        }

        mpvl_f.setStyle(createStyle(icon));
        mpvl_source?.addFeature(mpvl_f);
    }
}
