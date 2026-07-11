"use client";

import { useState } from "react";
import { Chart, Donut, Sparkline } from "../../../optimistic-ui/components/chart/chart";
import { Pill } from "../../../optimistic-ui/components/pill/pill";
import "./chartShowcase.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const inr = (v: number) => `${v}k`;

function ChartCard({ title, sub, wide, children }: { title: string; sub: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`csChartCard${wide ? " csChartCard--wide" : ""}`}>
      <div className="csChartTitle">{title}</div>
      <div className="csChartSub">{sub}</div>
      {children}
    </div>
  );
}

export default function ChartDemo() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  return (
    <div className="chartScope" data-mode={mode}>
      <div className="csToggleRow">
        <div style={{ display: "inline-flex", gap: 6 }}>
          {(["dark", "light"] as const).map((m) => (
            <Pill key={m} selected={mode === m} onClick={() => setMode(m)} style={{ textTransform: "capitalize" }}>{m}</Pill>
          ))}
        </div>
      </div>

      <div className="csChartGrid">
        <ChartCard title="Bar · grouped" sub="Two series per category, side by side. Hover for a tooltip; click the legend to toggle a series.">
          <Chart type="bar" height={240} categories={QUARTERS}
            series={[{ name: "Achieved", data: [28, 34, 22, 38] }, { name: "Target", data: [32, 30, 30, 34] }]} yFormat={inr} />
        </ChartCard>

        <ChartCard title="Bar · stacked" sub="Series stack into one bar per category.">
          <Chart type="bar" stacked height={240} categories={QUARTERS}
            series={[{ name: "New", data: [14, 18, 12, 20] }, { name: "Renewal", data: [10, 12, 14, 12] }, { name: "Expansion", data: [6, 8, 5, 9] }]} yFormat={inr} />
        </ChartCard>

        <ChartCard title="Line · multi-series" sub="Smooth-curved lines with data dots and a hover guide." wide>
          <Chart type="line" curved height={260} categories={MONTHS}
            series={[{ name: "Focus", data: [24, 31, 28, 40, 36, 44, 41] }, { name: "Distraction", data: [30, 22, 26, 18, 24, 16, 20] }]} yFormat={inr} />
        </ChartCard>

        <ChartCard title="Area · gradient" sub="A line with a gradient fill to the baseline.">
          <Chart type="area" curved height={240} legend={false} categories={MONTHS}
            series={[{ name: "Balance", data: [12, 16, 15, 22, 26, 24, 33] }]} yFormat={(v) => `$${v}k`} />
        </ChartCard>

        <ChartCard title="Donut · proportions" sub="Segments with a centre total and a value legend.">
          <Donut total segments={[{ label: "Enterprise", value: 48 }, { label: "Growth", value: 32 }, { label: "Starter", value: 20 }]} />
        </ChartCard>

        <ChartCard title="Sparkline · inline trend" sub="Tiny, axis-free trend for tables and cards. Colour follows direction." wide>
          <div className="csSparkRow">
            <div className="csSparkCell"><span>SOL</span><Sparkline data={[3, 5, 4, 6, 5, 8, 7, 9]} /><b>+4.7%</b></div>
            <div className="csSparkCell"><span>BTC</span><Sparkline data={[9, 8, 8, 6, 7, 5, 6, 4]} /><b>−1.6%</b></div>
            <div className="csSparkCell"><span>Cash</span><Sparkline area data={[4, 4, 5, 6, 6, 7, 8, 9]} width={120} height={36} /><b>+12%</b></div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
