import { Paper, svgns } from "./types";

export function newDivPaper(
  diameter: number,
  color: string
): Paper<HTMLDivElement> {
  const container = document.createElement("div");
  attachStyles(container, diameter, color);
  return { container };
}
export function newSvgPaper(
  diameter: number,
  color: string
): Paper<SVGSVGElement> {
  const container = document.createElementNS(svgns, "svg");
  container.setAttribute("xmlns", svgns);
  attachStyles(container, diameter, color);
  return { container };
}

function attachStyles(
  container: HTMLElement | SVGSVGElement,
  diameter: number,
  color: string
) {
  container.style.borderRadius = "50px";
  container.style.overflow = "hidden";
  container.style.padding = "0px";
  container.style.margin = "0px";
  container.style.width = "" + diameter + "px";
  container.style.height = "" + diameter + "px";
  container.style.display = "inline-block";
  container.style.background = color;
}
