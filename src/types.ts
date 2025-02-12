export type Paper<T extends HTMLElement | SVGSVGElement> = {
  container: T;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export const colors = [
  "#01888C", // teal
  "#FC7500", // bright orange
  "#034F5D", // dark teal
  "#F73F01", // orangered
  "#FC1960", // magenta
  "#C7144C", // raspberry
  "#F3C100", // goldenrod
  "#1598F2", // lightning blue
  "#2465E1", // sail blue
  "#F19E02", // gold
] as const;

export const wobble = 30 as const;
export const svgns = "http://www.w3.org/2000/svg" as const;
