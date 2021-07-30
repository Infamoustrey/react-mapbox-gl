import { Point, Map } from 'mapbox-gl';
import { Props } from '../projected-layer';
import { Anchor, AnchorsOffset } from './types';
export interface PointDef {
    x: number;
    y: number;
}
export interface OverlayParams {
    anchor?: Anchor;
    offset?: Point;
    position?: Point;
}
export declare const anchors: (keyof AnchorsOffset)[];
export declare const anchorTranslates: {
    center: string;
    top: string;
    left: string;
    right: string;
    bottom: string;
    'top-left': string;
    'top-right': string;
    'bottom-left': string;
    'bottom-right': string;
};
export declare const overlayState: (props: Props, map: Map, container: HTMLElement) => {
    anchor: keyof AnchorsOffset;
    position: Point;
    offset: Point;
};
export declare const overlayTransform: ({ anchor, position, offset }: OverlayParams) => string[];
