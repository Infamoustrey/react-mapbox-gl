/// <reference types="react" />
import * as MapboxGl from 'mapbox-gl';
export declare type MapEvent = (map: MapboxGl.Map, evt: React.SyntheticEvent<any>) => void;
export interface Events {
    onStyleLoad?: MapEvent;
    onResize?: MapEvent;
    onDblClick?: MapEvent;
    onClick?: MapEvent;
    onMouseMove?: MapEvent;
    onMouseOut?: MapEvent;
    onMoveStart?: MapEvent;
    onMove?: MapEvent;
    onMoveEnd?: MapEvent;
    onMouseDown?: MapEvent;
    onMouseUp?: MapEvent;
    onDragStart?: MapEvent;
    onDragEnd?: MapEvent;
    onDrag?: MapEvent;
    onZoomStart?: MapEvent;
    onZoom?: MapEvent;
    onZoomEnd?: MapEvent;
    onPitch?: MapEvent;
    onPitchStart?: MapEvent;
    onPitchEnd?: MapEvent;
    onWebGlContextLost?: MapEvent;
    onWebGlContextRestored?: MapEvent;
    onRemove?: MapEvent;
    onContextMenu?: MapEvent;
    onRender?: MapEvent;
    onError?: MapEvent;
    onSourceData?: MapEvent;
    onDataLoading?: MapEvent;
    onStyleDataLoading?: MapEvent;
    onStyleImageMissing?: MapEvent;
    onTouchCancel?: MapEvent;
    onData?: MapEvent;
    onSourceDataLoading?: MapEvent;
    onTouchMove?: MapEvent;
    onTouchEnd?: MapEvent;
    onTouchStart?: MapEvent;
    onStyleData?: MapEvent;
    onBoxZoomStart?: MapEvent;
    onBoxZoomEnd?: MapEvent;
    onBoxZoomCancel?: MapEvent;
    onRotateStart?: MapEvent;
    onRotate?: MapEvent;
    onRotateEnd?: MapEvent;
}
export declare type EventMapping = {
    [T in keyof Events]: string;
};
export declare const events: EventMapping;
export declare type Listeners = {
    [T in keyof Events]: (evt: React.SyntheticEvent<any>) => void;
};
export declare const listenEvents: (partialEvents: EventMapping, props: Partial<Events>, map: MapboxGl.Map) => Listeners;
export declare const updateEvents: (listeners: Listeners, currentProps: Partial<Events>, map: MapboxGl.Map) => {
    onStyleLoad?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onResize?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onDblClick?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onClick?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onMouseMove?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onMouseOut?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onMoveStart?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onMove?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onMoveEnd?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onMouseDown?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onMouseUp?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onDragStart?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onDragEnd?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onDrag?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onZoomStart?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onZoom?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onZoomEnd?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onPitch?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onPitchStart?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onPitchEnd?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onWebGlContextLost?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onWebGlContextRestored?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onRemove?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onContextMenu?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onRender?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onError?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onSourceData?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onDataLoading?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onStyleDataLoading?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onStyleImageMissing?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onTouchCancel?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onData?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onSourceDataLoading?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onTouchMove?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onTouchEnd?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onTouchStart?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onStyleData?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onBoxZoomStart?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onBoxZoomEnd?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onBoxZoomCancel?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onRotateStart?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onRotate?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
    onRotateEnd?: ((evt: React.SyntheticEvent<any>) => void) | undefined;
};
