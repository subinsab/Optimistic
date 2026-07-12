import type { ComponentType } from "react";
import { OptimisticDemo, DriftDemo, HeadlessDiagram } from "./interactives";
import {
  TokenLayers, TokenPipeline, InstallSteps, ClaudeLoop,
  ShipBars, CostBars, ScaleFan, AuditFindings, PracticeList,
} from "./diagrams";

/* kind string (used in article content blocks) → the visual component */
export const VISUALS: Record<string, ComponentType> = {
  "optimistic-demo": OptimisticDemo,
  "drift-demo": DriftDemo,
  "headless-diagram": HeadlessDiagram,
  "token-layers": TokenLayers,
  "token-pipeline": TokenPipeline,
  "install-steps": InstallSteps,
  "claude-loop": ClaudeLoop,
  "ship-bars": ShipBars,
  "cost-bars": CostBars,
  "scale-fan": ScaleFan,
  "audit-findings": AuditFindings,
  "practice-list": PracticeList,
};
