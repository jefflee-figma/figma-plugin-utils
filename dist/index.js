import { hexStringToRgba } from "./hexString";
export const defaultColor = Object.freeze({
    r: 1,
    g: 0,
    b: 1,
    a: 1,
});
/**
 * Converts colors from a variety of familiar formats to a standard RGBA object.
 */
export function rgba(color) {
    var _a;
    if (typeof color === "string") {
        return (_a = hexStringToRgba(color)) !== null && _a !== void 0 ? _a : defaultColor;
    }
    if (!("a" in color)) {
        return { r: color.r, g: color.g, b: color.b, a: 1 };
    }
    return color;
}
/**
 * Converts colors from a variety of familiar formats to a standard RGBA object.
 */
export const C = rgba;
