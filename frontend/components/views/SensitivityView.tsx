"use client";

import React, { useState, useMemo } from "react";
import { CaseData } from "@/types";
import { runSensitivityAnalysis } from "@/lib/decisionMath";
import {
  SlidersHorizontal,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

interface SensitivityViewProps {
  currentCase: CaseData;
}

export const SensitivityView: React.FC<SensitivityViewProps> = ({
  currentCase,
}) => {
  const { options, criteria, scores } = currentCase;

  // Selected criterion to modulate
  const [targetCritId, setTargetCritId] = useState<string>(
    criteria.find((c) => c.name.toLowerCase().includes("urgency"))?.id ||
      criteria[0]?.id ||
      ""
  );

  const selectedCriterion = criteria.find((c) => c.id === targetCritId);

  // Active slider weight (5% to 80%)
  const [sliderWeight, setSliderWeight] = useState<number>(
    selectedCriterion ? Math.round(selectedCriterion.weight * 100) : 25
  );

  // Run dynamic sensitivity curve
  const { curve, crossovers } = useMemo(() => {
    return runSensitivityAnalysis(options, criteria, scores, targetCritId);
  }, [options, criteria, scores, targetCritId]);

  // Current winner at active slider position
  const currentCurvePoint = curve.find((pt) => pt.weight === sliderWeight) || curve[0];
  const activeWinnerCode = currentCurvePoint?.winnerCode || "";

  const optionColors: Record<string, string> = {
    A: "#38bdf8", // sky
    B: "#10b981", // emerald
    C: "#818cf8", // indigo
    D: "#f59e0b", // amber
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-semibold text-white tracking-tight">
            What-If Sensitivity Simulator & Crossover Detection
          </h2>
        </div>
        <p className="text-xs text-slate-300">
          Modulate criteria weights in real-time to observe mathematical threshold
          inversions and recommendation robustness. Remaining weights are
          proportionally re-normalized automatically.
        </p>
      </div>

      {/* Control Panel: Select Criterion & Drag Slider */}
      <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Modulate Criterion:
            </span>
            <select
              value={targetCritId}
              onChange={(e) => {
                const newId = e.target.value;
                setTargetCritId(newId);
                const crit = criteria.find((c) => c.id === newId);
                if (crit) setSliderWeight(Math.round(crit.weight * 100));
              }}
              className="bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              {criteria.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (Baseline: {Math.round(c.weight * 100)}%)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              if (selectedCriterion) {
                setSliderWeight(Math.round(selectedCriterion.weight * 100));
              }
            }}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1 rounded bg-slate-800/60 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Baseline</span>
          </button>
        </div>

        {/* Interactive Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Allocated Weight for{" "}
              <span className="text-white font-medium">
                {selectedCriterion?.name}
              </span>
              :
            </span>
            <span className="font-mono font-bold text-sky-400 text-sm bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-800/60">
              {sliderWeight}%
            </span>
          </div>

          <input
            type="range"
            min={5}
            max={80}
            step={5}
            value={sliderWeight}
            onChange={(e) => setSliderWeight(Number(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>5% (Minimal Influence)</span>
            <span>40%</span>
            <span>80% (Dominant Factor)</span>
          </div>
        </div>
      </div>

      {/* Crossover Alert Callout (If any detected along curve) */}
      {crossovers.length > 0 && (
        <div className="glass-card rounded-xl p-4 border border-amber-700/80 bg-amber-950/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
              Mathematical Crossover Point Identified!
            </h4>
            {crossovers.map((co, idx) => (
              <p key={idx} className="text-xs text-amber-300/90">
                When <strong>{co.criterionName}</strong> weight increases to{" "}
                <span className="font-mono font-bold text-amber-200">
                  {co.thresholdWeight}%
                </span>
                , the recommendation flips from{" "}
                <strong className="text-white">Option {co.previousWinner}</strong> →{" "}
                <strong className="text-emerald-300">Option {co.newWinner}</strong>.
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Sensitivity Curve Line Chart */}
      <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-white">
              Dynamic Ranking Trajectory across {selectedCriterion?.name} Weight
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Active Slider: {sliderWeight}% (Current Winner: Option {activeWinnerCode})
          </span>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={curve}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="weight"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                unit="%"
              />
              <YAxis
                domain={[4, 10]}
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1120",
                  borderColor: "#1e293b",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#f8fafc",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />

              {/* Reference line showing current slider weight */}
              <ReferenceLine
                x={sliderWeight}
                stroke="#38bdf8"
                strokeDasharray="4 4"
                label={{
                  value: `Slider: ${sliderWeight}%`,
                  fill: "#38bdf8",
                  fontSize: 10,
                }}
              />

              {options.map((opt) => (
                <Line
                  key={opt.id}
                  type="monotone"
                  dataKey={`scores.${opt.optionCode}`}
                  name={`Option ${opt.optionCode}: ${opt.optionName}`}
                  stroke={optionColors[opt.optionCode] || "#94a3b8"}
                  strokeWidth={activeWinnerCode === opt.optionCode ? 3 : 1.5}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
