import MersenneTwister from "mersenne-twister";
import { HSL, wobble } from "./types";

export function genColor(
  colors: string[],
  generator: MersenneTwister
): { color: string; usedIdx: number } {
  const rand = generator.random();
  const idx = Math.floor(colors.length * rand);
  const color = colors[idx];
  return { color, usedIdx: idx };
}

export function hueShift(
  colors: string[],
  generator: MersenneTwister
): string[] {
  const amount = generator.random() * 30 - wobble / 2;
  const rotate = (hex: string) => colorRotate(hex, amount);
  return colors.map(rotate);
}

function colorRotate(hex: string, degrees: number): string {
  const hsl = hexToHSL(hex);
  let hue = hsl.h;
  hue = (hue + degrees) % 360;
  hue = hue < 0 ? 360 + hue : hue;
  hsl.h = hue;
  return HSLToHex(hsl);
}

function hexToHSL(hex: string): HSL {
  // Convert hex to RGB first
  let r = "0x" + hex[1] + hex[2];
  let g = "0x" + hex[3] + hex[4];
  let b = "0x" + hex[5] + hex[6];
  // Then to HSL
  const HSLr = parseFloat(r) / 255;
  const HSLg = parseFloat(g) / 255;
  const HSLb = parseFloat(b) / 255;
  const cmin = Math.min(HSLr, HSLg, HSLb),
    cmax = Math.max(HSLr, HSLg, HSLb),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax === HSLr) h = ((HSLg - HSLb) / delta) % 6;
  else if (cmax === HSLg) h = (HSLb - HSLr) / delta + 2;
  else h = (HSLr - HSLg) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

function HSLToHex(hsl: HSL) {
  var { h, s, l } = hsl;
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  //   r = Math.round((r + m) * 255).toString(16);
  //   g = Math.round((g + m) * 255).toString(16);
  //   b = Math.round((b + m) * 255).toString(16);

  const toPaddedHex = (num: number) => num.toString(16).padStart(2, "0");

  return `#${[r, g, b].map(toPaddedHex).join("")}`;
}
