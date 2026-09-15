"use client";

import React, { useMemo } from "react";
import { CaseData } from "@/types";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Radar as RadarIcon, Sparkles, Scale } from "lucide-react";

interface RadarViewProps {
  currentCase: CaseData;
}

export const RadarView: React.FC<RadarViewProps> = ({ currentCase }) => {
  const { options, criteria, scores } = currentCase;

  // Transform scores into radar dataset format
  const radarData = useMemo(() => {
    return criteria.map((crit) => {
      const entry: Record<string, any> = {
        criterion: crit.name,
        fullMark: 10,
      };

      options.forEach((opt) => {
        const match = scores.find(
          (s) => s.optionId === opt.id && s.criterionId === crit.id
        );
        // Scale 0.0-1.0 normalized score to 0-10 for radar clarity
        const val = match ? Number((match.normalizedScore * 10).toFixed(1)) : 5.0;
        entry[`Option ${opt.optionCode}`] = val;
      });

      return entry;
    });
  }, [options, criteria, scores]);

  const optionColors: Record<string, { stroke: string; fill: string }> = {
    A: { stroke: "#38bdf8", fill: "rgba(56, 189, 248, 0.25)" }, // sky
    B: { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.25)" }, // emerald
    C: { stroke: "#818cf8", fill: "rgba(129, 140, 248, 0.25)" }, // indigo
    D: { stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.25)" }, // amber
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <RadarIcon className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-semibold text-white tracking-tight">
            Multi-Axis Trade-Off Radar Analysis
          </h2>
        </div>
        <p className="text-xs text-slate-300">
          Compare candidate options simultaneously across normalized clinical,
          ethical, and procedural dimensions.
        </p>
      </div>

      {/* Main Radar Chart */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col items-center">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis
                dataKey="criterion"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 10]}
                stroke="#334155"
                tick={{ fill: "#64748b", fontSize: 10 }}
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
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                }}
              />

              {options.map((opt) => {
                const color = optionColors[opt.optionCode] || {
                  stroke: "#94a3b8",
                  fill: "rgba(148, 163, 184, 0.2)",
                };
                return (
                  <Radar
                    key={opt.id}
                    name={`Option ${opt.optionCode}: ${opt.optionName}`}
                    dataKey={`Option ${opt.optionCode}`}
                    stroke={color.stroke}
                    fill={color.fill}
                    fillOpacity={0.6}
                  />
                );
              })}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trade-Off Comparison Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => {
          const color = optionColors[opt.optionCode];
          return (
            <div
              key={opt.id}
              className="glass-card rounded-xl p-4 border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center border"
                    style={{
                      borderColor: color.stroke,
                      color: color.stroke,
                      backgroundColor: color.fill,
                    }}
                  >
                    {opt.optionCode}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Urgency: {opt.urgencyAlignmentRaw}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {opt.optionName}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3">
                  {opt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Risk Profile</span>
                  <span className="font-mono text-slate-200">
                    {opt.riskRaw} / 10
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Resource Drain</span>
                  <span className="font-mono text-slate-200">
                    {opt.resourceRequirementRaw}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Recovery Likelihood</span>
                  <span className="font-mono text-sky-400">
                    {opt.recoveryProbabilityRaw}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
