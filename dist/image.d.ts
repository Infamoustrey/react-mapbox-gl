/// <reference types="react" />
import { Map } from 'mapbox-gl';
interface ImageOptionsType {
    pixelRatio?: number;
    sdf?: boolean;
}
declare type ImageDataType = HTMLImageElement | ImageBitmap;
export interface Props {
    id: string;
    url?: string;
    data?: ImageDataType;
    options?: ImageOptionsType;
    onLoaded?: () => void;
    onError?: (error: Error) => void;
    map: Map;
}
declare const _default: <T>(props: T) => JSX.Element;
export default _default;
