import { RGB, RGBA } from "./common";
export { RGB, RGBA };
export declare const defaultColor: Readonly<{
    r: 1;
    g: 0;
    b: 1;
    a: 1;
}>;
/**
 * Converts colors from a variety of familiar formats to a standard RGBA object.
 */
export declare function rgba(color: string | RGB | RGBA): RGBA;
/**
 * Converts colors from a variety of familiar formats to a standard RGBA object.
 */
export declare const C: typeof rgba;
