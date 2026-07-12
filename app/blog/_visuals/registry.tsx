import type { ComponentType } from "react";
import { OptimisticDemo, DriftDemo, HeadlessDiagram } from "./interactives";
import { TokenLayers } from "./diagrams";

/* kind string (used in article content blocks) → the visual component */
export const VISUALS: Record<string, ComponentType> = {
  "optimistic-demo": OptimisticDemo,
  "drift-demo": DriftDemo,
  "headless-diagram": HeadlessDiagram,
  "token-layers": TokenLayers,
};
