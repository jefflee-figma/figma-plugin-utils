import { RGB, RGBA } from "./common";
import { hexStringToRgba } from "./hexString";

export { RGB, RGBA };

export const defaultColor = Object.freeze({
  r: 1,
  g: 0,
  b: 1,
  a: 1,
});

/**
 * Converts colors from a variety of familiar formats to a standard RGBA object.
 * Returns magenta if the provided color cannot be parsed.
 */
export function rgba(color: string | RGB | RGBA): RGBA {
  if (typeof color === "string") {
    return hexStringToRgba(color) ?? defaultColor;
  }

  if (!("a" in color)) {
    return { r: color.r, g: color.g, b: color.b, a: 1 };
  }

  return color;
}

/**
 * Converts colors from a variety of familiar formats to a standard RGBA object.
 * Returns magenta if the provided color cannot be parsed.
 */
export const C = rgba;
