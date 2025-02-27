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
import * as React from 'react';
import { withMap } from './context';
var Source = (function (_super) {
    __extends(Source, _super);
    function Source() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id;
        _this.onStyleDataChange = function () {
            if (!_this.props.map.getLayer(_this.id)) {
                _this.initialize();
                _this.forceUpdate();
            }
        };
        _this.initialize = function () {
            var map = _this.props.map;
            var _a = _this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource, onSourceAdded = _a.onSourceAdded;
            if (!map.getSource(_this.id) && (geoJsonSource || tileJsonSource)) {
                if (geoJsonSource) {
                    map.addSource(_this.id, geoJsonSource);
                }
                else if (tileJsonSource) {
                    map.addSource(_this.id, tileJsonSource);
                }
                map.on('sourcedata', _this.onData);
                if (onSourceAdded) {
                    onSourceAdded(map.getSource(_this.id));
                }
            }
        };
        _this.onData = function () {
            var map = _this.props.map;
            var source = map.getSource(_this.props.id);
            if (!source || !map.isSourceLoaded(_this.props.id)) {
                return;
            }
            var onSourceLoaded = _this.props.onSourceLoaded;
            if (source && onSourceLoaded) {
                onSourceLoaded(source);
            }
            if (source && _this.props.geoJsonSource && _this.props.geoJsonSource.data) {
                source.setData(_this.props.geoJsonSource.data);
            }
            map.off('sourcedata', _this.onData);
        };
        return _this;
    }
    Source.prototype.componentDidMount = function () {
        var map = this.props.map;
        map.on('styledata', this.onStyleDataChange);
        this.initialize();
    };
    Source.prototype.removeSource = function () {
        var _this = this;
        var map = this.props.map;
        if (map.getSource(this.id)) {
            var _a = map.getStyle().layers, layers_1 = _a === void 0 ? [] : _a;
            var mapLayers = layers_1
                .map(function (layer, idx) {
                var before = (layers_1[idx + 1] || { id: undefined }).id;
                return __assign(__assign({}, layer), { before: before });
            })
                .filter(function (layer) { return layer.source === _this.id; });
            mapLayers.forEach(function (layer) { return map.removeLayer(layer.id); });
            map.removeSource(this.id);
            return mapLayers.reverse();
        }
        return [];
    };
    Source.prototype.componentWillUnmount = function () {
        var map = this.props.map;
        if (!map || !map.getStyle()) {
            return;
        }
        map.off('styledata', this.onStyleDataChange);
        this.removeSource();
    };
    Source.prototype.componentDidUpdate = function (prevProps) {
        var geoJsonSource = prevProps.geoJsonSource, tileJsonSource = prevProps.tileJsonSource, map = prevProps.map;
        var source = map.getSource(this.id);
        if (tileJsonSource && this.props.tileJsonSource) {
            var urlUpdated = false;
            var tilesUpdated = false;
            if (source && source.type === 'vector') {
                var hasNewSourceUrl = tileJsonSource.url !== this.props.tileJsonSource.url;
                if (hasNewSourceUrl && this.props.tileJsonSource.url !== undefined) {
                    source.setUrl(this.props.tileJsonSource.url);
                    urlUpdated = true;
                }
                var hasNewSourceTiles = tileJsonSource.tiles !== this.props.tileJsonSource.tiles;
                if (hasNewSourceTiles &&
                    this.props.tileJsonSource.tiles !== undefined) {
                    source.setTiles(this.props.tileJsonSource.tiles);
                    tilesUpdated = true;
                }
            }
            var hasNewTilesSource = (!urlUpdated && tileJsonSource.url !== this.props.tileJsonSource.url) ||
                (!tilesUpdated &&
                    tileJsonSource.tiles !== this.props.tileJsonSource.tiles) ||
                tileJsonSource.minzoom !== this.props.tileJsonSource.minzoom ||
                tileJsonSource.maxzoom !== this.props.tileJsonSource.maxzoom;
            if (hasNewTilesSource) {
                var layers = this.removeSource();
                map.addSource(this.id, this.props.tileJsonSource);
                layers.forEach(function (layer) { return map.addLayer(layer, layer.before); });
            }
        }
        if (geoJsonSource &&
            this.props.geoJsonSource &&
            this.props.geoJsonSource.data !== geoJsonSource.data &&
            this.props.geoJsonSource.data &&
            source &&
            source.type === 'geojson') {
            source.setData(this.props.geoJsonSource.data);
        }
    };
    Source.prototype.render = function () {
        return null;
    };
    return Source;
}(React.Component));
export { Source };
export default withMap(Source);
//# sourceMappingURL=source.js.map