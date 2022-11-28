import MersenneTwister from "mersenne-twister";
import { genColor, hueShift } from "./colors";
import newPaper from "./paper";
import { colors } from "./types";

const shapeCount = 4 as const;
const svgns = "http://www.w3.org/2000/svg" as const;

export default function generateIdenticon(
  diameter: number,
  seed: number
): HTMLDivElement {
  const generator = new MersenneTwister(seed);
  let remainingColors = [...colors] as string[];
  remainingColors = hueShift(remainingColors.slice(), generator);

  const { color: colorToUse, usedIdx } = genColor(remainingColors, generator);
  remainingColors.splice(usedIdx, 1);

  const elements = newPaper(diameter, colorToUse);
  const container = elements.container;

  const svg = document.createElementNS(svgns, "svg");
  svg.setAttributeNS(null, "x", "0");
  svg.setAttributeNS(null, "y", "0");
  svg.setAttributeNS(null, "width", `${diameter}`);
  svg.setAttributeNS(null, "height", `${diameter}`);

  container.appendChild(svg);

  for (let i = 0; i < shapeCount - 1; i++) {
    genShape(remainingColors, diameter, i, shapeCount - 1, svg, generator);
  }

  return container;
}

function genShape(
  remainingColors: string[],
  diameter: number,
  i: number,
  total: number,
  svg: SVGSVGElement,
  generator: MersenneTwister
) {
  const center = diameter / 2;

  const shape = document.createElementNS(svgns, "rect");
  shape.setAttributeNS(null, "x", "0");
  shape.setAttributeNS(null, "y", "0");
  shape.setAttributeNS(null, "width", `${diameter}`);
  shape.setAttributeNS(null, "height", `${diameter}`);

  const firstRot = generator.random();
  const angle = Math.PI * 2 * firstRot;
  const velocity =
    (diameter / total) * generator.random() + (i * diameter) / total;

  const tx = Math.cos(angle) * velocity;
  const ty = Math.sin(angle) * velocity;

  const translate = "translate(" + tx + " " + ty + ")";

  // Third random is a shape rotation on top of all of that.
  const secondRot = generator.random();
  const rot = firstRot * 360 + secondRot * 180;
  const rotate = "rotate(" + rot.toFixed(1) + " " + center + " " + center + ")";
  const transform = translate + " " + rotate;
  shape.setAttributeNS(null, "transform", transform);
  const { color: fill, usedIdx } = genColor(remainingColors, generator);
  remainingColors.splice(usedIdx, 1);
  shape.setAttributeNS(null, "fill", fill);

  svg.appendChild(shape);
}
