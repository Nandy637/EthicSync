"use client";

import React, { useState, useMemo } from "react";
import { CaseData } from "@/types";
import { runDirichletStability } from "@/lib/decisionMath";
import {
  Compass,
  RotateCw,
  ShieldAlert,
  CheckCircle2,
  BarChart3,
  Percent,
} from "lucide-react";

interface StabilityViewProps {
  currentCase: CaseData;
}

export const StabilityView: React.FC<StabilityViewProps> = ({
  currentCase,
}) => {
  const { options, criteria, scores } = currentCase;
  const [simTrigger, setSimTrigger] = useState<number>(0);

  // Run Dirichlet Monte Carlo Simulation
  const stabilityResult = useMemo(() => {
    return runDirichletStability(options, criteria, scores, 5000);
  }, [options, criteria, scores, simTrigger]);

  const {
    winnerCode,
    stabilityIndex,
    stabilityMargin,
    distribution,
    isStable,
  } = stabilityResult;

  const totalRuns = Object.values(distribution).reduce((a, b) => a + b, 0) || 5000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-semibold text-white tracking-tight">
              Recommendation Stability Index (Dirichlet Monte Carlo)
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            5,000 simulations under controlled Dirichlet weight perturbations ($\sum w_i = 1$).
            Measures resilience against subjective scoring uncertainty.
          </p>
        </div>

        <button
          onClick={() => setSimTrigger((prev) => prev + 1)}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer shrink-0"
        >
          <RotateCw className="w-3.5 h-3.5 text-sky-400" />
          <span>Re-Simulate (5,000 Runs)</span>
        </button>
      </div>

      {/* Stability Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Recommendation Stability Index */}
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Recommendation Stability</span>
            <Percent className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">
            {stabilityIndex}%
          </div>
          <p className="text-[11px] text-slate-400">
            Frequency that Option {winnerCode} emerges as mathematically dominant.
          </p>
        </div>

        {/* Metric 2: Runner-Up Margin */}
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Stability Margin</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-emerald-400">
            +{stabilityMargin}%
          </div>
          <p className="text-[11px] text-slate-400">
            Lead over the nearest competing runner-up option.
          </p>
        </div>

        {/* Metric 3: Safety Classification */}
        <div
          className={`glass-card rounded-xl p-5 border ${
            isStable
              ? "border-emerald-700/60 bg-emerald-950/20"
              : "border-rose-700/80 bg-rose-950/30"
          } space-y-2`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className={isStable ? "text-emerald-300" : "text-rose-300"}>
              Safety Gate Classification
            </span>
            {isStable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            )}
          </div>
          <div
            className={`text-2xl font-bold font-mono ${
              isStable ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {isStable ? "STABLE DECISION" : "UNSTABLE DECISION"}
          </div>
          <p className="text-[11px] text-slate-400">
            Threshold: Stability ≥ 75% AND Margin ≥ 15%.
          </p>
        </div>
      </div>

      {/* Unstable Decision Warning */}
      {!isStable && (
        <div className="glass-card rounded-xl p-4 border border-rose-800/80 bg-rose-950/40 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-rose-200 uppercase tracking-wider">
              Safety Gate Tripped: Fragile Recommendation Margin
            </h4>
            <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">
              Under multi-criteria perturbation, the plurality winner is
              susceptible to inversion from negligible weight shifts (stability
              margin is below 15%). The safety engine has set{" "}
              <code className="bg-rose-900/60 px-1 py-0.5 rounded text-rose-200">
                human_review_required = true
              </code>{" "}
              and mandated multidisciplinary committee deliberation.
            </p>
          </div>
        </div>
      )}

      {/* Victory Distribution Breakdown */}
      <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-white">
          Simulation Victory Share (5,000 Dirichlet Runs)
        </h3>

        <div className="space-y-3">
          {options.map((opt) => {
            const wins = distribution[opt.optionCode] || 0;
            const pct = ((wins / totalRuns) * 100).toFixed(1);
            const isTop = opt.optionCode === winnerCode;

            return (
              <div key={opt.id} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center ${
                        isTop
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {opt.optionCode}
                    </span>
                    <span className="text-slate-200 font-medium">
                      {opt.optionName}
                    </span>
                  </div>
                  <span className="font-mono text-slate-300">
                    {wins.toLocaleString()} wins ({pct}%)
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isTop ? "bg-emerald-400" : "bg-sky-600/60"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
