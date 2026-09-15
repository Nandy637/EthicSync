"use client";

import React, { useMemo } from "react";
import { CaseData } from "@/types";
import { calculateMCDMScores } from "@/lib/decisionMath";
import {
  Calculator,
  Trophy,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface MCDMViewProps {
  currentCase: CaseData;
}

export const MCDMView: React.FC<MCDMViewProps> = ({ currentCase }) => {
  const { options, criteria, scores } = currentCase;

  // Calculate deterministic rankings
  const mcdmResults = useMemo(() => {
    return calculateMCDMScores(options, criteria, scores);
  }, [options, criteria, scores]);

  const winner = mcdmResults[0];

  return (
    <div className="space-y-6">
      {/* Header & Winner Callout */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Deterministic Mathematical Output
            </span>
            <span className="text-xs text-slate-400">
              Weighted Sum Model (Linear Normalization 0.0 – 1.0)
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            Multi-Criteria Decision Matrix (MCDM)
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Every clinical option is evaluated against standardized clinical & ethical
            criteria with normalized weights. Calculations are executed strictly by
            deterministic mathematics, not AI inference.
          </p>
        </div>

        {/* Winner Badge */}
        {winner && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-sky-950/70 border border-emerald-500/40 glow-cyan shrink-0 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                Rank #1 Algorithmic Winner
              </span>
              <span className="text-base font-bold text-white">
                Option {winner.optionCode}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-mono font-semibold text-sky-300">
                  Score: {winner.totalScore} / 10.0
                </span>
                <span className="text-[10px] text-slate-400">
                  ({(winner.totalScore * 10).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Criteria Weight Allocation Strip */}
      <div className="glass-card rounded-xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>Active Criteria Weights (Physician-Governed)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Sum = 100% (Normalized)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {criteria.map((c) => (
            <div
              key={c.id}
              className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-200 truncate">
                  {c.name}
                </span>
                <span className="font-mono font-bold text-sky-400 text-[11px]">
                  {Math.round(c.weight * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate">{c.description}</span>
                <span
                  className={`px-1 rounded text-[9px] font-mono ${
                    c.direction === "MAX"
                      ? "text-emerald-400 bg-emerald-950/60"
                      : "text-amber-400 bg-amber-950/60"
                  }`}
                >
                  {c.direction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Raw vs Normalized Scoring Matrix */}
      <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            Scoring Matrix: Raw Inputs & Normalized Scores ($s_{"ij"} \in [0, 1]$)
          </h3>
          <span className="text-xs text-slate-400">
            Hover to inspect source provenance
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3 pl-4">Option Code & Name</th>
                {criteria.map((c) => (
                  <th key={c.id} className="p-3 text-center">
                    <div>{c.name}</div>
                    <span className="text-[10px] font-mono text-sky-400 font-normal">
                      {Math.round(c.weight * 100)}% ({c.direction})
                    </span>
                  </th>
                ))}
                <th className="p-3 pr-4 text-right">Composite Score</th>
                <th className="p-3 text-center">Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mcdmResults.map((result) => {
                const opt = options.find((o) => o.id === result.optionId);
                const isWinner = result.rank === 1;

                return (
                  <tr
                    key={result.optionId}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      isWinner ? "bg-emerald-950/15" : ""
                    }`}
                  >
                    <td className="p-3 pl-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
                            isWinner
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                              : "bg-slate-800 text-slate-300 border border-slate-700"
                          }`}
                        >
                          {result.optionCode}
                        </span>
                        <div>
                          <span className="font-semibold text-slate-200 block">
                            {result.optionName}
                          </span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {opt?.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Criteria Columns */}
                    {criteria.map((c) => {
                      const match = scores.find(
                        (s) =>
                          s.optionId === result.optionId &&
                          s.criterionId === c.id
                      );
                      const norm = match ? match.normalizedScore : 0.5;
                      const raw = match ? match.rawValue : "--";

                      return (
                        <td key={c.id} className="p-3 text-center">
                          <div className="font-mono text-slate-100 font-semibold">
                            {norm.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {raw}
                          </div>
                        </td>
                      );
                    })}

                    {/* Composite Score */}
                    <td className="p-3 pr-4 text-right font-mono font-bold text-base">
                      <span
                        className={isWinner ? "text-emerald-400" : "text-slate-300"}
                      >
                        {result.totalScore.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {" "}
                        / 10
                      </span>
                    </td>

                    {/* Rank Badge */}
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          result.rank === 1
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : result.rank === 2
                            ? "bg-slate-700/60 text-slate-200"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        #{result.rank}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Factor Contribution Waterfall for Winner */}
      {winner && (
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Score Decomposition for Option {winner.optionCode} ("Why It Won")</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              Total Score: {winner.totalScore}
            </span>
          </div>

          <div className="space-y-2">
            {Object.entries(winner.breakdown).map(([critName, points], idx) => {
              const pct = (points / (winner.totalScore / 10)) * 100;
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>{critName}</span>
                    <span className="font-mono text-sky-300">
                      +{(points * 10).toFixed(2)} pts ({pct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
