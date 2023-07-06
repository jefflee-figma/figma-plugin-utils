const charZero = "0".charCodeAt(0);
const charNine = "9".charCodeAt(0);
const charA = "A".charCodeAt(0);
const charF = "F".charCodeAt(0);
const char_a = "a".charCodeAt(0);
const char_f = "f".charCodeAt(0);
// Converts a hex ASCII code to its integer value.
function hexAsciiToInt(char) {
    if (charZero <= char && char <= charNine) {
        return char - charZero;
    }
    else if (char >= charA && char <= charF) {
        return char - charA + 10;
    }
    else if (char >= char_a && char <= char_f) {
        return char - char_a + 10;
    }
    return undefined;
}
function hex1ToIntensity(char) {
    const intVal = hexAsciiToInt(char);
    return intVal === undefined ? undefined : intVal / 15;
}
function hex2ToIntensity(big, little) {
    const bigInt = hexAsciiToInt(big);
    const littleInt = hexAsciiToInt(little);
    if (bigInt === undefined || littleInt === undefined) {
        return undefined;
    }
    return (bigInt * 16 + littleInt) / 255;
}
export function hexStringToRgba(hexStr) {
    if (hexStr[0] !== "#") {
        return undefined;
    }
    // We handle shorthand and full-length colors, as well as alpha and alpha-less variants.
    // See: https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color
    switch (hexStr.length) {
        // #RGB
        case 4: {
            const r = hex1ToIntensity(hexStr.charCodeAt(1));
            const g = hex1ToIntensity(hexStr.charCodeAt(2));
            const b = hex1ToIntensity(hexStr.charCodeAt(3));
            if (r === undefined || g === undefined || b === undefined) {
                return undefined;
            }
            return { r, g, b, a: 1 };
        }
        // #RGBA
        case 5: {
            const r = hex1ToIntensity(hexStr.charCodeAt(1));
            const g = hex1ToIntensity(hexStr.charCodeAt(2));
            const b = hex1ToIntensity(hexStr.charCodeAt(3));
            const a = hex1ToIntensity(hexStr.charCodeAt(4));
            if (r === undefined ||
                g === undefined ||
                b === undefined ||
                a === undefined) {
                return undefined;
            }
            return { r, g, b, a };
        }
        // #RRGGBB
        case 7: {
            const r = hex2ToIntensity(hexStr.charCodeAt(1), hexStr.charCodeAt(2));
            const g = hex2ToIntensity(hexStr.charCodeAt(3), hexStr.charCodeAt(4));
            const b = hex2ToIntensity(hexStr.charCodeAt(5), hexStr.charCodeAt(6));
            if (r === undefined || g === undefined || b === undefined) {
                return undefined;
            }
            return { r, g, b, a: 1 };
        }
        // #RRGGBBAA
        case 9: {
            const r = hex2ToIntensity(hexStr.charCodeAt(1), hexStr.charCodeAt(2));
            const g = hex2ToIntensity(hexStr.charCodeAt(3), hexStr.charCodeAt(4));
            const b = hex2ToIntensity(hexStr.charCodeAt(5), hexStr.charCodeAt(6));
            const a = hex2ToIntensity(hexStr.charCodeAt(7), hexStr.charCodeAt(8));
            if (r === undefined ||
                g === undefined ||
                b === undefined ||
                a === undefined) {
                return undefined;
            }
            return { r, g, b, a };
        }
        default:
            return undefined;
    }
}
