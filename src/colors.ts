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
  const HSLr = +r / 255;
  const HSLg = +g / 255;
  const HSLb = +b / 255;
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
  let { h, s, l } = hsl;
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
