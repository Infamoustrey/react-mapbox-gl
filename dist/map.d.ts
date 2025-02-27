import * as MapboxGl from "mapbox-gl";
import * as React from "react";
import { Events, Listeners } from "./map-events";
export interface PaddingOptions {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface FitBoundsOptions {
    linear?: boolean;
    easing?: (time: number) => number;
    padding?: number | PaddingOptions;
    offset?: MapboxGl.Point | [number, number];
    maxZoom?: number;
    duration?: number;
}
export declare type FitBounds = [[number, number], [number, number]];
export interface AnimationOptions {
    duration: number;
    animate: boolean;
    easing(time: number): number;
    offset: number[];
}
export interface FlyToOptions {
    curve: number;
    minZoom: number;
    speed: number;
    screenSpeed: number;
}
export interface Props {
    style: string | MapboxGl.Style;
    center?: [number, number];
    zoom?: [number];
    maxBounds?: MapboxGl.LngLatBounds | FitBounds;
    fitBounds?: FitBounds;
    fitBoundsOptions?: FitBoundsOptions;
    bearing?: [number];
    pitch?: [number];
    containerStyle?: React.CSSProperties;
    className?: string;
    movingMethod?: "jumpTo" | "easeTo" | "flyTo";
    animationOptions?: Partial<AnimationOptions>;
    flyToOptions?: Partial<FlyToOptions>;
    children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
    renderChildrenInPortal?: boolean;
}
export interface State {
    map?: MapboxGl.Map;
    ready: boolean;
}
export declare type RequestTransformFunction = (url: string, resourceType: any) => any;
export interface FactoryParameters {
    accessToken: string;
    minZoom?: number;
    maxZoom?: number;
    hash?: boolean;
    preserveDrawingBuffer?: boolean;
    scrollZoom?: boolean;
    interactive?: boolean;
    dragRotate?: boolean;
    pitchWithRotate?: boolean;
    attributionControl?: boolean;
    customAttribution?: string | string[];
    logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    renderWorldCopies?: boolean;
    trackResize?: boolean;
    touchZoomRotate?: boolean;
    doubleClickZoom?: boolean;
    keyboard?: boolean;
    dragPan?: boolean;
    boxZoom?: boolean;
    refreshExpiredTiles?: boolean;
    failIfMajorPerformanceCaveat?: boolean;
    bearingSnap?: number;
    transformRequest?: RequestTransformFunction;
    antialias?: boolean;
    mapInstance?: MapboxGl.Map;
}
declare global {
    namespace mapboxgl {
        interface MapboxOptions {
            failIfMajorPerformanceCaveat?: boolean;
            transformRequest?: MapboxGl.TransformRequestFunction;
        }
    }
}
declare const ReactMapboxFactory: ({ accessToken, minZoom, maxZoom, hash, preserveDrawingBuffer, scrollZoom, interactive, dragRotate, pitchWithRotate, attributionControl, customAttribution, logoPosition, renderWorldCopies, trackResize, touchZoomRotate, doubleClickZoom, keyboard, dragPan, boxZoom, refreshExpiredTiles, failIfMajorPerformanceCaveat, bearingSnap, antialias, mapInstance, transformRequest, }: FactoryParameters) => {
    new (props: (Props & Events) | Readonly<Props & Events>): {
        state: State;
        listeners: Listeners;
        _isMounted: boolean;
        container?: HTMLElement | undefined;
        calcCenter: (bounds: FitBounds) => [number, number];
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: Props & Events): null;
        setRef: (x: HTMLElement | null) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<Props & Events>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & Events> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props & Events>, nextState: Readonly<State>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & Events>, prevState: Readonly<State>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & Events>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & Events>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & Events>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & Events>, nextState: Readonly<State>, nextContext: any): void;
    };
    new (props: Props & Events, context: any): {
        state: State;
        listeners: Listeners;
        _isMounted: boolean;
        container?: HTMLElement | undefined;
        calcCenter: (bounds: FitBounds) => [number, number];
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: Props & Events): null;
        setRef: (x: HTMLElement | null) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<Props & Events>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & Events> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props & Events>, nextState: Readonly<State>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & Events>, prevState: Readonly<State>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & Events>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & Events>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & Events>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & Events>, nextState: Readonly<State>, nextContext: any): void;
    };
    defaultProps: {
        onStyleLoad: (map: MapboxGl.Map, evt: any) => null;
        center: number[];
        zoom: number[];
        bearing: number;
        movingMethod: string;
        pitch: number;
        containerStyle: {
            textAlign: string;
        };
    };
    contextType?: React.Context<any> | undefined;
};
export default ReactMapboxFactory;
