import * as React from "react";
import { Props as FeatureProps } from "./feature";
import { LayerCommonProps, Props as LayerProps } from "./layer";
import { Map } from "mapbox-gl";
export interface EnhancedLayerProps {
    id?: string;
    map: Map;
}
export declare type OwnProps = EnhancedLayerProps & LayerCommonProps;
export declare function layerMouseTouchEvents(WrappedComponent: React.ComponentClass<LayerProps>): {
    new (props: OwnProps | Readonly<OwnProps>): {
        hover: number[];
        draggedChildren: Array<React.ReactElement<FeatureProps>> | undefined;
        id: string;
        getChildren: () => React.ReactElement<FeatureProps, string | React.JSXElementConstructor<any>>[];
        getChildFromId: (children: Array<React.ReactElement<FeatureProps>>, id: number) => React.ReactElement<FeatureProps, string | React.JSXElementConstructor<any>>;
        areFeaturesDraggable: (children: Array<React.ReactElement<FeatureProps>>, featureIds?: number[]) => boolean;
        onClick: (evt: any) => void;
        onMouseEnter: (evt: any) => void;
        onMouseLeave: (evt: any) => void;
        onMouseDown: () => void;
        onTouchStart: (evt: any) => void;
        onFeatureDown: (startEvent: string) => void;
        onFeatureDragStart: (evt: any) => void;
        onFeatureDrag: (evt: any) => void;
        onFeatureDragEnd: (evt: any) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<OwnProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<OwnProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<OwnProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<OwnProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<OwnProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<OwnProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<OwnProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<OwnProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<OwnProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: OwnProps, context: any): {
        hover: number[];
        draggedChildren: Array<React.ReactElement<FeatureProps>> | undefined;
        id: string;
        getChildren: () => React.ReactElement<FeatureProps, string | React.JSXElementConstructor<any>>[];
        getChildFromId: (children: Array<React.ReactElement<FeatureProps>>, id: number) => React.ReactElement<FeatureProps, string | React.JSXElementConstructor<any>>;
        areFeaturesDraggable: (children: Array<React.ReactElement<FeatureProps>>, featureIds?: number[]) => boolean;
        onClick: (evt: any) => void;
        onMouseEnter: (evt: any) => void;
        onMouseLeave: (evt: any) => void;
        onMouseDown: () => void;
        onTouchStart: (evt: any) => void;
        onFeatureDown: (startEvent: string) => void;
        onFeatureDragStart: (evt: any) => void;
        onFeatureDrag: (evt: any) => void;
        onFeatureDragEnd: (evt: any) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<OwnProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<OwnProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<OwnProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<OwnProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<OwnProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<OwnProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<OwnProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<OwnProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<OwnProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export default layerMouseTouchEvents;
