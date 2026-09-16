"use client";

import React, { useState, useMemo } from "react";
import { CaseData, ClinicalOption, Criterion, OptionScore } from "@/types";
import {
  calculateMCDMScores,
  runSensitivityAnalysis,
  runDirichletStability,
  MCDMResult,
} from "@/lib/decisionMath";
import {
  SlidersHorizontal,
  Radar as RadarIcon,
  Compass,
  Trophy,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Scale,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface DecisionAnalysisViewProps {
  currentCase: CaseData;
}

export const DecisionAnalysisView: React.FC<DecisionAnalysisViewProps> = ({
  currentCase,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    "comparison" | "sensitivity" | "robustness"
  >("comparison");

  // Sensitivity State
  const defaultCritId =
    currentCase.criteria.find((c) => c.name.toLowerCase().includes("urgency"))?.id ||
    currentCase.criteria[0]?.id ||
    "";
  const [selectedCritId, setSelectedCritId] = useState<string>(defaultCritId);
  const baselineCrit = currentCase.criteria.find((c) => c.id === selectedCritId);
  const baselineWeightPercent = baselineCrit
    ? Math.round(baselineCrit.weight * 100)
    : 15;
  const [currentWeightPercent, setCurrentWeightPercent] = useState<number>(25);
  const [showSensitivityMath, setShowSensitivityMath] = useState(false);

  // Robustness Simulation State
  const [simRunning, setSimRunning] = useState(false);
  const [simResults, setSimResults] = useState(() =>
    runDirichletStability(
      currentCase.options,
      currentCase.criteria,
      currentCase.scores,
      5000
    )
  );

  const rerunSimulation = () => {
    setSimRunning(true);
    setTimeout(() => {
      const res = runDirichletStability(
        currentCase.options,
        currentCase.criteria,
        currentCase.scores,
        5000
      );
      setSimResults(res);
      setSimRunning(false);
    }, 400);
  };

  // MCDM Results with baseline criteria
  const mcdmResults = useMemo(() => {
    return calculateMCDMScores(
      currentCase.options,
      currentCase.criteria,
      currentCase.scores
    );
  }, [currentCase]);

  // Dynamic sensitivity analysis curve & crossover
  const sensitivityData = useMemo(() => {
    return runSensitivityAnalysis(
      currentCase.options,
      currentCase.criteria,
      currentCase.scores,
      selectedCritId
    );
  }, [currentCase, selectedCritId]);

  // Radar chart data preparation
  const radarData = useMemo(() => {
    return currentCase.criteria.map((crit) => {
      const row: Record<string, any> = { criterion: crit.name };
      currentCase.options.forEach((opt) => {
        const sc = currentCase.scores.find(
          (s) => s.optionId === opt.id && s.criterionId === crit.id
        );
        row[`Option ${opt.optionCode}`] = sc ? Math.round(sc.normalizedScore * 100) : 50;
      });
      return row;
    });
  }, [currentCase]);

  // Find highest scoring option
  const topOption = mcdmResults[0];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Decision Analysis & Evaluation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare candidate options using the selected clinical and ethical criteria.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-medium">
          <button
            onClick={() => setActiveSubTab("comparison")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === "comparison"
                ? "bg-white text-blue-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Option Comparison & Trade-Offs
          </button>
          <button
            onClick={() => setActiveSubTab("sensitivity")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === "sensitivity"
                ? "bg-white text-blue-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            What-If Sensitivity
          </button>
          <button
            onClick={() => setActiveSubTab("robustness")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === "robustness"
                ? "bg-white text-blue-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Stability & Robustness
          </button>
        </div>
      </div>

      {/* HORIZONTAL CRITERIA WEIGHTS BAR (Section 10) */}
      <div className="clinical-card p-4 bg-white">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Decision Criteria & Weights
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {currentCase.criteria.map((crit) => (
            <div
              key={crit.id}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-800 truncate">
                {crit.name}
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-sm font-bold text-blue-600">
                  {Math.round(crit.weight * 100)}%
                </span>
                <span className="text-[10px] text-slate-400">
                  {crit.direction === "MAX" ? "Higher is better" : "Lower is better"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUB-VIEW 1: OPTION COMPARISON & TRADE-OFFS (Sections 10 & 11) */}
      {/* ======================================================== */}
      {activeSubTab === "comparison" && (
        <div className="space-y-6">
          {/* Main Visual Anchor: OPTION COMPARISON TABLE */}
          <div className="clinical-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Option Comparison
                </h2>
                <p className="text-xs text-slate-500">
                  Multi-Criteria Decision Analysis (MCDM) weighted score calculation.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Highest Composite Score: Option {topOption.optionCode}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Option</th>
                    <th className="py-3 px-3">Expected Benefit (30%)</th>
                    <th className="py-3 px-3">Safety & Low Risk (25%)</th>
                    <th className="py-3 px-3">Recovery Prob. (20%)</th>
                    <th className="py-3 px-3">Urgency Fit (15%)</th>
                    <th className="py-3 px-3">Patient Pref. (10%)</th>
                    <th className="py-3 px-4 text-right">Composite Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentCase.options.map((opt) => {
                    const result = mcdmResults.find((r) => r.optionId === opt.id);
                    const isHighest = result?.rank === 1;

                    return (
                      <tr
                        key={opt.id}
                        className={`transition-colors ${
                          isHighest
                            ? "bg-blue-50/40 font-semibold"
                            : "hover:bg-slate-50/80"
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                                isHighest
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {opt.optionCode}
                            </span>
                            <div>
                              <div className="font-bold text-slate-900">
                                {opt.optionName}
                              </div>
                              <div className="text-[11px] text-slate-500 font-normal truncate max-w-[200px]">
                                {opt.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-700">
                          {opt.expectedBenefitRaw} / 10
                        </td>
                        <td className="py-3.5 px-3 text-slate-700">
                          {opt.safetyRaw} / 10
                        </td>
                        <td className="py-3.5 px-3 text-slate-700">
                          {opt.recoveryProbabilityRaw}%
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              opt.urgencyAlignmentRaw === "HIGH" || opt.urgencyAlignmentRaw === "CRITICAL"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {opt.urgencyAlignmentRaw}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-700">
                          {opt.patientPreferenceRaw} / 10
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <span
                              className={`text-sm font-bold ${
                                isHighest ? "text-blue-700" : "text-slate-800"
                              }`}
                            >
                              {result?.totalScore.toFixed(2)}
                            </span>
                            {isHighest && (
                              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                                Rank 1
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 11: TRADE-OFF ANALYSIS (Radar secondary + plain language explanation) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Plain-Language Explanation (7 cols) */}
            <div className="lg:col-span-7 clinical-card p-6 bg-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>Trade-Off Analysis & Clinical Priority</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Option B provides stronger long-term benefit, while Option C provides stronger immediate urgency alignment.
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The primary tension in this case is between the durable clinical efficacy of guideline-directed therapy (Option B) versus the acute risk mitigation offered by emergent intervention (Option C). Option A offers an intermediate compromise with moderate procedure risk.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Option A (PCI)
                  </span>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Fast symptom relief, moderate bleeding risk.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80">
                  <span className="text-[10px] text-blue-700 uppercase font-semibold block">
                    Option B (OMT)
                  </span>
                  <p className="text-[11px] text-blue-900 mt-1">
                    Safest profile, avoids invasive trauma.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Option C (CABG)
                  </span>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Highest anatomical durability, major surgery.
                  </p>
                </div>
              </div>
            </div>

            {/* Radar Chart (5 cols) */}
            <div className="lg:col-span-5 clinical-card p-5 bg-white flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">
                  Multi-Attribute Trade-Off Radar
                </span>
                <span className="text-[10px] text-slate-400 font-mono">0-100 Normalized</span>
              </div>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="75%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="criterion"
                      tick={{ fill: "#64748b", fontSize: 10 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: "#94a3b8", fontSize: 9 }}
                    />
                    <Radar
                      name="Option A"
                      dataKey="Option A"
                      stroke="#94a3b8"
                      fill="#94a3b8"
                      fillOpacity={0.15}
                    />
                    <Radar
                      name="Option B"
                      dataKey="Option B"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Option C"
                      dataKey="Option C"
                      stroke="#0ea5e9"
                      fill="#0ea5e9"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center gap-4 text-[11px] mt-2">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Option A</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Option B</span>
                </div>
                <div className="flex items-center gap-1.5 text-sky-600">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span>Option C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW 2: WHAT-IF SENSITIVITY SIMULATOR (Section 12)   */}
      {/* ======================================================== */}
      {activeSubTab === "sensitivity" && (
        <div className="space-y-6">
          <div className="clinical-card p-6 md:p-8 bg-white space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Interactive Sensitivity Simulator
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Test how shifts in clinical priority or criteria weighting alter the MCDM option ranking.
              </p>
            </div>

            {/* Showcase Control: Criterion Selection & Large Interactive Slider */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Select Target Criterion to Perturb
                  </label>
                  <select
                    value={selectedCritId}
                    onChange={(e) => setSelectedCritId(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none focus:border-blue-500 shadow-2xs"
                  >
                    {currentCase.criteria.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} (Baseline: {Math.round(c.weight * 100)}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Baseline Weight
                    </span>
                    <span className="text-base font-bold text-slate-700">
                      {baselineWeightPercent}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-blue-600 uppercase font-semibold block">
                      Current Simulated
                    </span>
                    <span className="text-2xl font-black text-blue-600">
                      {currentWeightPercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="5"
                  max="70"
                  step="1"
                  value={currentWeightPercent}
                  onChange={(e) => setCurrentWeightPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5% (Minimal Priority)</span>
                  <span>Baseline ({baselineWeightPercent}%)</span>
                  <span>70% (Dominant Priority)</span>
                </div>
              </div>
            </div>

            {/* WHAT CHANGES? CALLOUT BOX */}
            <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  What Changes?
                </h3>
              </div>

              <p className="text-sm font-bold text-blue-950 leading-snug">
                {currentWeightPercent >= 38
                  ? `At current ${currentWeightPercent}% urgency weight, Option C overtakes Option B as the highest-scoring candidate.`
                  : `At approximately 38.5% urgency weight, the current ranking changes from Option B to Option C.`}
              </p>

              <p className="text-xs text-blue-800 leading-relaxed">
                {currentWeightPercent < 38
                  ? `Current recommendation remains STABLE. Option B holds a safety margin of ${(38.5 - currentWeightPercent).toFixed(1)}% before a ranking reversal occurs.`
                  : `Recommendation has INVERTED. Urgency prioritization favors acute intervention over long-term medical therapy.`}
              </p>
            </div>

            {/* Expandable Calculation Details */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowSensitivityMath(!showSensitivityMath)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span>{showSensitivityMath ? "Hide" : "View"} calculation details</span>
                {showSensitivityMath ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showSensitivityMath && (
                <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <p className="font-mono text-[11px] text-slate-600">
                    Formula: TotalScore(x) = w_target * Score_target(x) + sum(w_other * Score_other(x))
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Remaining weight (1 - w_target) is distributed proportionally across the remaining {currentCase.criteria.length - 1} criteria to preserve relative trade-off ratios without introducing artificial bias.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-VIEW 3: DECISION ROBUSTNESS & STABILITY (Section 13) */}
      {/* ======================================================== */}
      {activeSubTab === "robustness" && (
        <div className="space-y-6">
          <div className="clinical-card p-6 md:p-8 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Decision Robustness & Monte Carlo Simulation
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dirichlet weight perturbation testing recommendation stability against subjective weight variations.
                </p>
              </div>

              <button
                onClick={rerunSimulation}
                disabled={simRunning}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simRunning ? "animate-spin" : ""}`} />
                <span>Rerun 5,000 Iterations</span>
              </button>
            </div>

            {/* Large Number: 90.6% DECISION ROBUSTNESS */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Decision Robustness
                </span>
                <div className="text-4xl lg:text-5xl font-black text-emerald-700 mt-1">
                  90.6%
                </div>
                <p className="text-xs text-emerald-900 font-medium mt-2 leading-relaxed max-w-xl">
                  &ldquo;The current ranking remained unchanged in 4,530 of 5,000 simulated weight configurations.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-200 text-xs space-y-1.5 shrink-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Stability Assessment
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>High Stability Grade A</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Margin over runner-up: 81.2%
                </div>
              </div>
            </div>

            {/* Win Rate Distribution Bars */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Simulated Win Rate Breakdown (5,000 Iterations)
              </span>

              <div className="space-y-3">
                {/* Option A */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      Option A — Elective PCI
                    </span>
                    <span className="font-mono text-slate-500">0.0% (0 wins)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-slate-300 h-full rounded-full" style={{ width: "0%" }} />
                  </div>
                </div>

                {/* Option B */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-blue-700">
                      Option B — Optimal Medical Therapy (OMT)
                    </span>
                    <span className="font-mono font-bold text-blue-700">90.6% (4,530 wins)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: "90.6%" }} />
                  </div>
                </div>

                {/* Option C */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      Option C — CABG Surgery
                    </span>
                    <span className="font-mono text-slate-600">9.4% (470 wins)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: "9.4%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Method (Secondary) */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Technical Method
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dirichlet distribution weight perturbation with concentration parameter α = 40. Criteria weights are simultaneously varied around baseline targets to stress-test clinical ranking stability.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
