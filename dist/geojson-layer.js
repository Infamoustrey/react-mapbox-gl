var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import { isEqual } from "lodash";
import diff from "./util/diff";
import { v4 as uuid } from "uuid";
import { withMap } from "./context";
var types = ["symbol", "line", "fill", "fill-extrusion", "circle"];
var toCamelCase = function (str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
        .replace(/[\s+]|-/g, "");
};
var eventToHandler = {
    mousemove: "OnMouseMove",
    mouseenter: "OnMouseEnter",
    mouseleave: "OnMouseLeave",
    mousedown: "OnMouseDown",
    mouseup: "OnMouseUp",
    click: "OnClick",
};
var GeoJSONLayer = (function (_super) {
    __extends(GeoJSONLayer, _super);
    function GeoJSONLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id || "geojson-" + uuid();
        _this.source = __assign(__assign({ type: "geojson" }, _this.props.sourceOptions), { data: _this.props.data });
        _this.layerIds = [];
        _this.buildLayerId = function (type) {
            return _this.id + "-" + type;
        };
        _this.createLayer = function (type) {
            var _a = _this.props, before = _a.before, layerOptions = _a.layerOptions, map = _a.map;
            var layerId = _this.buildLayerId(type);
            _this.layerIds.push(layerId);
            var paint = _this.props[toCamelCase(type) + "Paint"] || {};
            var visibility = Object.keys(paint).length ? "visible" : "none";
            var layout = _this.props[toCamelCase(type) + "Layout"] || {
                visibility: visibility,
            };
            var layer = __assign({ id: layerId, source: _this.id, type: type, paint: paint, layout: layout }, layerOptions);
            map.addLayer(layer, before);
            _this.mapLayerMouseHandlers(type);
        };
        _this.mapLayerMouseHandlers = function (type) {
            var map = _this.props.map;
            var layerId = _this.buildLayerId(type);
            var events = Object.keys(eventToHandler);
            events.forEach(function (event) {
                var handler = _this.props["" + toCamelCase(type) + eventToHandler[event]] || null;
                if (handler) {
                    map.on(event, layerId, handler);
                }
            });
        };
        _this.onStyleDataChange = function () {
            if (!_this.props.map.getSource(_this.id)) {
                _this.unbind();
                _this.initialize();
                _this.forceUpdate();
            }
        };
        _this.isGeoJSONSource = function (source) {
            return !!source &&
                typeof source.setData === "function";
        };
        return _this;
    }
    GeoJSONLayer.prototype.initialize = function () {
        var map = this.props.map;
        map.addSource(this.id, this.source);
        this.createLayer("symbol");
        this.createLayer("line");
        this.createLayer("fill");
        this.createLayer("fill-extrusion");
        this.createLayer("circle");
    };
    GeoJSONLayer.prototype.unbind = function () {
        var _this = this;
        var map = this.props.map;
        if (map.getSource(this.id)) {
            var layers = map.getStyle().layers;
            if (layers) {
                layers
                    .filter(function (layer) {
                    return types.map(function (t) { return _this.id + "-" + t; }).includes(layer.id);
                })
                    .forEach(function (layer) { return map.removeLayer(layer.id); });
            }
            map.removeSource(this.id);
        }
        types.forEach(function (type) {
            var events = Object.keys(eventToHandler);
            events.forEach(function (event) {
                var prop = toCamelCase(type) + eventToHandler[event];
                if (_this.props[prop]) {
                    map.off(event, _this.buildLayerId(type), _this.props[prop]);
                }
            });
        });
        this.layerIds.forEach(function (lId) {
            if (map.getLayer(lId)) {
                map.removeLayer(lId);
            }
        });
    };
    GeoJSONLayer.prototype.componentDidMount = function () {
        var map = this.props.map;
        this.initialize();
        map.on("styledata", this.onStyleDataChange);
    };
    GeoJSONLayer.prototype.componentWillUnmount = function () {
        var map = this.props.map;
        if (!map || !map.getStyle()) {
            return;
        }
        map.off("styledata", this.onStyleDataChange);
        this.unbind();
    };
    GeoJSONLayer.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var data = prevProps.data, before = prevProps.before, layerOptions = prevProps.layerOptions, map = prevProps.map;
        var source = map.getSource(this.id);
        if (!this.isGeoJSONSource(source)) {
            return;
        }
        if (this.props.data !== data) {
            source.setData(this.props.data);
            this.source = __assign(__assign({ type: "geojson" }, this.props.sourceOptions), { data: this.props.data });
        }
        var layerFilterChanged = this.props.layerOptions &&
            layerOptions &&
            !isEqual(this.props.layerOptions.filter, layerOptions.filter);
        types.forEach(function (type) {
            var layerId = _this.buildLayerId(type);
            if (_this.props.layerOptions && layerFilterChanged) {
                map.setFilter(layerId, _this.props.layerOptions.filter || []);
            }
            var paintProp = toCamelCase(type) + "Paint";
            if (!isEqual(prevProps[paintProp], _this.props[paintProp])) {
                var paintDiff_1 = diff(prevProps[paintProp], _this.props[paintProp]);
                Object.keys(paintDiff_1).forEach(function (key) {
                    map.setPaintProperty(layerId, key, paintDiff_1[key]);
                });
            }
            var layoutProp = toCamelCase(type) + "Layout";
            if (!isEqual(prevProps[layoutProp], _this.props[layoutProp])) {
                var layoutDiff_1 = diff(prevProps[layoutProp], _this.props[layoutProp]);
                Object.keys(layoutDiff_1).forEach(function (key) {
                    map.setLayoutProperty(layerId, key, layoutDiff_1[key]);
                });
            }
            var events = Object.keys(eventToHandler);
            events.forEach(function (event) {
                var prop = toCamelCase(type) + eventToHandler[event];
                if (prevProps[prop] !== _this.props[prop]) {
                    if (prevProps[prop]) {
                        map.off(event, layerId, prevProps[prop]);
                    }
                    if (_this.props[prop]) {
                        map.on(event, layerId, _this.props[prop]);
                    }
                }
            });
            if (before !== _this.props.before) {
                map.moveLayer(layerId, _this.props.before);
            }
        });
    };
    GeoJSONLayer.prototype.render = function () {
        return null;
    };
    return GeoJSONLayer;
}(React.Component));
export { GeoJSONLayer };
export default withMap(GeoJSONLayer);
//# sourceMappingURL=geojson-layer.js.map