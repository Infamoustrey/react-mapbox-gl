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
import * as MapboxGl from "mapbox-gl";
import * as React from "react";
import { listenEvents, events, updateEvents, } from "./map-events";
import { MapContext } from "./context";
import { createPortal } from "react-dom";
import { isEqual } from "lodash";
var defaultZoom = [11];
var defaultMovingMethod = "flyTo";
var defaultCenter = [-0.2416815, 51.5285582];
var ReactMapboxFactory = function (_a) {
    var _b;
    var accessToken = _a.accessToken, _c = _a.minZoom, minZoom = _c === void 0 ? 0 : _c, _d = _a.maxZoom, maxZoom = _d === void 0 ? 20 : _d, _e = _a.hash, hash = _e === void 0 ? false : _e, _f = _a.preserveDrawingBuffer, preserveDrawingBuffer = _f === void 0 ? false : _f, _g = _a.scrollZoom, scrollZoom = _g === void 0 ? true : _g, _h = _a.interactive, interactive = _h === void 0 ? true : _h, _j = _a.dragRotate, dragRotate = _j === void 0 ? true : _j, _k = _a.pitchWithRotate, pitchWithRotate = _k === void 0 ? true : _k, _l = _a.attributionControl, attributionControl = _l === void 0 ? true : _l, customAttribution = _a.customAttribution, _m = _a.logoPosition, logoPosition = _m === void 0 ? "bottom-left" : _m, _o = _a.renderWorldCopies, renderWorldCopies = _o === void 0 ? true : _o, _p = _a.trackResize, trackResize = _p === void 0 ? true : _p, _q = _a.touchZoomRotate, touchZoomRotate = _q === void 0 ? true : _q, _r = _a.doubleClickZoom, doubleClickZoom = _r === void 0 ? true : _r, _s = _a.keyboard, keyboard = _s === void 0 ? true : _s, _t = _a.dragPan, dragPan = _t === void 0 ? true : _t, _u = _a.boxZoom, boxZoom = _u === void 0 ? true : _u, _v = _a.refreshExpiredTiles, refreshExpiredTiles = _v === void 0 ? true : _v, _w = _a.failIfMajorPerformanceCaveat, failIfMajorPerformanceCaveat = _w === void 0 ? false : _w, _x = _a.bearingSnap, bearingSnap = _x === void 0 ? 7 : _x, _y = _a.antialias, antialias = _y === void 0 ? false : _y, mapInstance = _a.mapInstance, transformRequest = _a.transformRequest;
    return _b = (function (_super) {
            __extends(ReactMapboxGl, _super);
            function ReactMapboxGl() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    map: mapInstance,
                    ready: false,
                };
                _this.listeners = {};
                _this._isMounted = true;
                _this.calcCenter = function (bounds) { return [
                    (bounds[0][0] + bounds[1][0]) / 2,
                    (bounds[0][1] + bounds[1][1]) / 2,
                ]; };
                _this.setRef = function (x) {
                    _this.container = x;
                };
                return _this;
            }
            ReactMapboxGl.prototype.componentDidMount = function () {
                var _this = this;
                var _a = this.props, style = _a.style, onStyleLoad = _a.onStyleLoad, center = _a.center, pitch = _a.pitch, zoom = _a.zoom, fitBounds = _a.fitBounds, fitBoundsOptions = _a.fitBoundsOptions, bearing = _a.bearing, maxBounds = _a.maxBounds;
                if (!Array.isArray(zoom)) {
                    throw new Error("zoom need to be an array type of length 1 for reliable update");
                }
                var opts = {
                    accessToken: accessToken,
                    preserveDrawingBuffer: preserveDrawingBuffer,
                    hash: hash,
                    zoom: zoom[0],
                    minZoom: minZoom,
                    maxZoom: maxZoom,
                    maxBounds: maxBounds,
                    container: this.container,
                    center: fitBounds && center === defaultCenter
                        ? this.calcCenter(fitBounds)
                        : center,
                    style: style,
                    scrollZoom: scrollZoom,
                    attributionControl: attributionControl,
                    customAttribution: customAttribution,
                    interactive: interactive,
                    dragRotate: dragRotate,
                    pitchWithRotate: pitchWithRotate,
                    renderWorldCopies: renderWorldCopies,
                    trackResize: trackResize,
                    touchZoomRotate: touchZoomRotate,
                    doubleClickZoom: doubleClickZoom,
                    keyboard: keyboard,
                    dragPan: dragPan,
                    boxZoom: boxZoom,
                    refreshExpiredTiles: refreshExpiredTiles,
                    logoPosition: logoPosition,
                    bearingSnap: bearingSnap,
                    failIfMajorPerformanceCaveat: failIfMajorPerformanceCaveat,
                    antialias: antialias,
                    transformRequest: transformRequest,
                };
                if (bearing) {
                    if (!Array.isArray(bearing)) {
                        throw new Error("bearing need to be an array type of length 1 for reliable update");
                    }
                    opts.bearing = bearing[0];
                }
                if (pitch) {
                    if (!Array.isArray(pitch)) {
                        throw new Error("pitch need to be an array type of length 1 for reliable update");
                    }
                    opts.pitch = pitch[0];
                }
                var map = this.state.map;
                if (!map) {
                    map = new MapboxGl.Map(opts);
                    this.setState({ map: map });
                }
                if (fitBounds) {
                    map.fitBounds(fitBounds, fitBoundsOptions, { fitboundUpdate: true });
                }
                map.on("load", function (evt) {
                    if (_this._isMounted) {
                        _this.setState({ ready: true });
                    }
                    if (onStyleLoad) {
                        onStyleLoad(map, evt);
                    }
                });
                this.listeners = listenEvents(events, this.props, map);
            };
            ReactMapboxGl.prototype.componentWillUnmount = function () {
                var map = this.state.map;
                this._isMounted = false;
                if (map) {
                    map.remove();
                }
            };
            ReactMapboxGl.prototype.componentDidUpdate = function (prevProps) {
                var _this = this;
                var map = this.state.map;
                if (!map) {
                    return null;
                }
                this.listeners = updateEvents(this.listeners, this.props, map);
                var center = map.getCenter();
                var zoom = map.getZoom();
                var bearing = map.getBearing();
                var pitch = map.getPitch();
                var didZoomUpdate = prevProps.zoom !== this.props.zoom &&
                    (this.props.zoom && this.props.zoom[0]) !== zoom;
                var didCenterUpdate = prevProps.center !== this.props.center &&
                    ((this.props.center && this.props.center[0]) !== center.lng ||
                        (this.props.center && this.props.center[1]) !== center.lat);
                var didBearingUpdate = prevProps.bearing !== this.props.bearing &&
                    (this.props.bearing && this.props.bearing[0]) !== bearing;
                var didPitchUpdate = prevProps.pitch !== this.props.pitch &&
                    (this.props.pitch && this.props.pitch[0]) !== pitch;
                if (this.props.maxBounds) {
                    var didMaxBoundsUpdate = prevProps.maxBounds !== this.props.maxBounds;
                    if (didMaxBoundsUpdate) {
                        map.setMaxBounds(this.props.maxBounds);
                    }
                }
                if (this.props.fitBounds) {
                    var fitBounds = prevProps.fitBounds;
                    var didFitBoundsUpdate = fitBounds !== this.props.fitBounds ||
                        this.props.fitBounds.length !== (fitBounds && fitBounds.length) ||
                        !!fitBounds.filter(function (c, i) {
                            var nc = _this.props.fitBounds && _this.props.fitBounds[i];
                            return c[0] !== (nc && nc[0]) || c[1] !== (nc && nc[1]);
                        })[0];
                    if (didFitBoundsUpdate ||
                        !isEqual(prevProps.fitBoundsOptions, this.props.fitBoundsOptions)) {
                        map.fitBounds(this.props.fitBounds, this.props.fitBoundsOptions, {
                            fitboundUpdate: true,
                        });
                    }
                }
                if (didZoomUpdate ||
                    didCenterUpdate ||
                    didBearingUpdate ||
                    didPitchUpdate) {
                    var mm = this.props.movingMethod || defaultMovingMethod;
                    var _a = this.props, flyToOptions = _a.flyToOptions, animationOptions = _a.animationOptions;
                    map[mm](__assign(__assign(__assign({}, animationOptions), flyToOptions), { zoom: didZoomUpdate && this.props.zoom ? this.props.zoom[0] : zoom, center: didCenterUpdate ? this.props.center : center, bearing: didBearingUpdate ? this.props.bearing : bearing, pitch: didPitchUpdate ? this.props.pitch : pitch }));
                }
                if (!isEqual(prevProps.style, this.props.style)) {
                    map.setStyle(this.props.style);
                }
                return null;
            };
            ReactMapboxGl.prototype.render = function () {
                var _a = this.props, containerStyle = _a.containerStyle, className = _a.className, children = _a.children, renderChildrenInPortal = _a.renderChildrenInPortal;
                var _b = this.state, ready = _b.ready, map = _b.map;
                if (renderChildrenInPortal) {
                    var container = ready && map && typeof map.getCanvasContainer === "function"
                        ? map.getCanvasContainer()
                        : undefined;
                    return (React.createElement(MapContext.Provider, { value: map },
                        React.createElement("div", { ref: this.setRef, className: className, style: __assign({}, containerStyle) }, ready && container && createPortal(children, container))));
                }
                return (React.createElement(MapContext.Provider, { value: map },
                    React.createElement("div", { ref: this.setRef, className: className, style: __assign({}, containerStyle) }, ready && children)));
            };
            return ReactMapboxGl;
        }(React.Component)),
        _b.defaultProps = {
            onStyleLoad: function (map, evt) { return null; },
            center: defaultCenter,
            zoom: defaultZoom,
            bearing: 0,
            movingMethod: defaultMovingMethod,
            pitch: 0,
            containerStyle: {
                textAlign: "left",
            },
        },
        _b;
};
export default ReactMapboxFactory;
//# sourceMappingURL=map.js.map