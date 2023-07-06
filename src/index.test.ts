import { expect, test } from "vitest";
import { C, defaultColor } from "./index";
import { RGB, RGBA } from "./common";

function expectSameColor(a: RGBA, b: RGBA, msg?: string) {
  expect(a.r, msg).toBeCloseTo(b.r);
  expect(a.g, msg).toBeCloseTo(b.g);
  expect(a.b, msg).toBeCloseTo(b.b);
  expect(a.a, msg).toBeCloseTo(b.a);
}

function expectConversion(src: string | RGB | RGBA, dst: RGBA) {
  const msg = typeof src === "string" ? src : JSON.stringify(src);
  expectSameColor(C(src), dst, msg);
}

test("basic functionality", () => {
  const cases: [string | RGB | RGBA, RGBA][] = [
    ["#000", { r: 0, g: 0, b: 0, a: 1 }],
    ["#000000", { r: 0, g: 0, b: 0, a: 1 }],
    [
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 0, b: 0, a: 1 },
    ],
    [
      { r: 0, g: 0, b: 0, a: 1 },
      { r: 0, g: 0, b: 0, a: 1 },
    ],

    ["#0000", { r: 0, g: 0, b: 0, a: 0 }],
    ["#00000000", { r: 0, g: 0, b: 0, a: 0 }],
    [
      { r: 0, g: 0, b: 0, a: 0 },
      { r: 0, g: 0, b: 0, a: 0 },
    ],

    ["#FFF", { r: 1, g: 1, b: 1, a: 1 }],
    ["#FFFF", { r: 1, g: 1, b: 1, a: 1 }],
    ["#FFFFFF", { r: 1, g: 1, b: 1, a: 1 }],
    ["#FF0000FF", { r: 1, g: 0, b: 0, a: 1 }],
    [
      { r: 1, g: 1, b: 1 },
      { r: 1, g: 1, b: 1, a: 1 },
    ],
    [
      { r: 1, g: 1, b: 1, a: 1 },
      { r: 1, g: 1, b: 1, a: 1 },
    ],

    ["#F00", { r: 1, g: 0, b: 0, a: 1 }],
    ["#F00F", { r: 1, g: 0, b: 0, a: 1 }],
    ["#FF0000", { r: 1, g: 0, b: 0, a: 1 }],
    ["#FF0000FF", { r: 1, g: 0, b: 0, a: 1 }],
    [
      { r: 1, g: 0, b: 0 },
      { r: 1, g: 0, b: 0, a: 1 },
    ],
    [
      { r: 1, g: 0, b: 0, a: 1 },
      { r: 1, g: 0, b: 0, a: 1 },
    ],

    ["#0F0", { r: 0, g: 1, b: 0, a: 1 }],
    ["#0F0F", { r: 0, g: 1, b: 0, a: 1 }],
    ["#00FF00", { r: 0, g: 1, b: 0, a: 1 }],
    ["#00FF00FF", { r: 0, g: 1, b: 0, a: 1 }],
    [
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 1, b: 0, a: 1 },
    ],
    [
      { r: 0, g: 1, b: 0, a: 1 },
      { r: 0, g: 1, b: 0, a: 1 },
    ],

    ["#00F", { r: 0, g: 0, b: 1, a: 1 }],
    ["#00FF", { r: 0, g: 0, b: 1, a: 1 }],
    ["#0000FF", { r: 0, g: 0, b: 1, a: 1 }],
    ["#0000FFFF", { r: 0, g: 0, b: 1, a: 1 }],
    [
      { r: 0, g: 0, b: 1 },
      { r: 0, g: 0, b: 1, a: 1 },
    ],
    [
      { r: 0, g: 0, b: 1, a: 1 },
      { r: 0, g: 0, b: 1, a: 1 },
    ],

    ["#888", { r: 0.53, g: 0.53, b: 0.53, a: 1 }],
    ["#888888", { r: 0.53, g: 0.53, b: 0.53, a: 1 }],
    ["#8888", { r: 0.53, g: 0.53, b: 0.53, a: 0.53 }],
    ["#88888888", { r: 0.53, g: 0.53, b: 0.53, a: 0.53 }],

    [
      { r: 0.5, g: 0.5, b: 0.5 },
      { r: 0.5, g: 0.5, b: 0.5, a: 1 },
    ],
    [
      { r: 0.5, g: 0.5, b: 0.5, a: 0.5 },
      { r: 0.5, g: 0.5, b: 0.5, a: 0.5 },
    ],
  ];

  for (const [src, want] of cases) {
    expectConversion(src, want);
  }
});

test("error cases", () => {
  const cases: (string | RGB | RGBA)[] = [
    // missing #
    "000",
    "0000",
    "000000",
    "00000000",

    // invalid hex digits
    "#GGG",
    "#GGGG",
    "#GGGGGG",
    "#GGGGGGGG",

    // invalid length
    "#0",
    "#00",
    "#00000",
    "#0000000",
  ];

  for (const c of cases) {
    expectConversion(c, defaultColor);
  }
});
