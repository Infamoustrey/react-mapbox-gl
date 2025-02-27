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
import { v4 as uuid } from "uuid";
export function layerMouseTouchEvents(WrappedComponent) {
    return (function (_super) {
        __extends(EnhancedLayer, _super);
        function EnhancedLayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hover = [];
            _this.draggedChildren = undefined;
            _this.id = _this.props.id || "layer-" + uuid();
            _this.getChildren = function () {
                return []
                    .concat(_this.props.children)
                    .filter(function (el) {
                    return typeof el !== "undefined";
                });
            };
            _this.getChildFromId = function (children, id) { return children[id]; };
            _this.areFeaturesDraggable = function (children, featureIds) {
                if (featureIds === void 0) { featureIds = _this.hover; }
                return !!featureIds
                    .map(function (id) {
                    return _this.getChildFromId(children, id)
                        ? _this.getChildFromId(children, id).props.draggable
                        : false;
                })
                    .filter(Boolean).length;
            };
            _this.onClick = function (evt) {
                var features = evt.features;
                var children = _this.getChildren();
                var map = _this.props.map;
                if (features) {
                    features.forEach(function (feature) {
                        var id = feature.properties.id;
                        if (children) {
                            var child = _this.getChildFromId(children, id);
                            var onClick = child && child.props.onClick;
                            if (onClick) {
                                onClick(__assign(__assign({}, evt), { feature: feature, map: map }));
                            }
                        }
                    });
                }
            };
            _this.onMouseEnter = function (evt) {
                var children = _this.getChildren();
                var map = _this.props.map;
                _this.hover = [];
                evt.features.forEach(function (feature) {
                    var id = feature.properties.id;
                    var child = _this.getChildFromId(children, id);
                    _this.hover.push(id);
                    var onMouseEnter = child && child.props.onMouseEnter;
                    if (onMouseEnter) {
                        onMouseEnter(__assign(__assign({}, evt), { feature: feature, map: map }));
                    }
                });
                if (_this.areFeaturesDraggable(children)) {
                    map.dragPan.disable();
                }
            };
            _this.onMouseLeave = function (evt) {
                var children = _this.getChildren();
                var map = _this.props.map;
                if (_this.areFeaturesDraggable(children)) {
                    map.dragPan.enable();
                }
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    var onMouseLeave = child && child.props.onMouseLeave;
                    if (onMouseLeave) {
                        onMouseLeave(__assign(__assign({}, evt), { map: map }));
                    }
                });
                if (!_this.draggedChildren) {
                    _this.hover = [];
                }
            };
            _this.onMouseDown = function () {
                if (_this.hover.length) {
                    _this.onFeatureDown("mousedown");
                }
            };
            _this.onTouchStart = function (evt) {
                _this.hover = evt.features.map(function (feature) { return feature.properties.id; });
                if (_this.hover.length) {
                    _this.onFeatureDown("touchstart");
                }
            };
            _this.onFeatureDown = function (startEvent) {
                var moveEvent = startEvent === "mousedown" ? "mousemove" : "touchmove";
                var endEvent = startEvent === "mousedown" ? "mouseup" : "touchend";
                var map = _this.props.map;
                map.once(moveEvent, _this.onFeatureDragStart);
                map.on(moveEvent, _this.onFeatureDrag);
                map.once(endEvent, function (evt) {
                    map.off(moveEvent, _this.onFeatureDragStart);
                    map.off(moveEvent, _this.onFeatureDrag);
                    _this.onFeatureDragEnd(evt);
                });
            };
            _this.onFeatureDragStart = function (evt) {
                var map = _this.props.map;
                var children = _this.getChildren();
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    if (child && !child.props.draggable) {
                        return;
                    }
                    var onDragStart = child && child.props.onDragStart;
                    if (onDragStart) {
                        onDragStart(__assign(__assign({}, evt), { map: map }));
                    }
                });
            };
            _this.onFeatureDrag = function (evt) {
                var children = _this.getChildren();
                var map = _this.props.map;
                var _a = evt.lngLat, lng = _a.lng, lat = _a.lat;
                _this.draggedChildren = [];
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    var onDrag = child && child.props.onDrag;
                    if (child && child.props.draggable) {
                        _this.draggedChildren.push(React.cloneElement(child, {
                            coordinates: [lng, lat],
                        }));
                        if (onDrag) {
                            onDrag(__assign(__assign({}, evt), { map: map }));
                        }
                    }
                });
                _this.forceUpdate();
            };
            _this.onFeatureDragEnd = function (evt) {
                var map = _this.props.map;
                var children = _this.getChildren();
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    var onDragEnd = child && child.props.onDragEnd;
                    if (onDragEnd && child.props.draggable && _this.draggedChildren) {
                        onDragEnd(__assign(__assign({}, evt), { map: map }));
                    }
                });
                _this.draggedChildren = undefined;
            };
            return _this;
        }
        EnhancedLayer.prototype.componentDidMount = function () {
            var map = this.props.map;
            map.on("click", this.id, this.onClick);
            map.on("mouseenter", this.id, this.onMouseEnter);
            map.on("mouseleave", this.id, this.onMouseLeave);
            map.on("mousedown", this.id, this.onMouseDown);
            map.on("touchstart", this.id, this.onTouchStart);
        };
        EnhancedLayer.prototype.componentWillUnmount = function () {
            var map = this.props.map;
            map.off("click", this.onClick);
            map.off("mouseenter", this.onMouseEnter);
            map.off("mouseleave", this.onMouseLeave);
            map.off("mousedown", this.onMouseDown);
            map.off("touchstart", this.onTouchStart);
        };
        EnhancedLayer.prototype.render = function () {
            return (React.createElement(WrappedComponent, __assign({}, this.props, { id: this.id, map: this.props.map, draggedChildren: this.draggedChildren })));
        };
        return EnhancedLayer;
    }(React.Component));
}
export default layerMouseTouchEvents;
//# sourceMappingURL=layer-events-hoc.js.map