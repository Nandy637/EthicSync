"use client";

import React from "react";
import { CaseData, UserRole } from "@/types";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  FileCheck2,
  ShieldAlert,
  User,
  Activity,
  HeartHandshake,
  Calendar,
  Sparkles,
} from "lucide-react";
import { NavTabId } from "../layout/CaseContextBar";

interface OverviewViewProps {
  currentCase: CaseData;
  onNavigateTab: (tab: NavTabId) => void;
  currentRole: UserRole;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  currentCase,
  onNavigateTab,
}) => {
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "CRITICAL":
      case "HIGH":
        return "bg-red-50 text-red-700 border-red-200";
      case "MODERATE":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DECIDED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "HUMAN_REVIEW":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "DELIBERATION":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // Best scoring option
  const topOption = currentCase.options.find((o) => o.optionCode === "B") || currentCase.options[0];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* 1. PRIMARY VISUAL ANCHOR: THE CASE HEADER */}
      <div className="clinical-card p-6 md:p-8 relative overflow-hidden bg-white border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Meta Tags */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {currentCase.id}
              </span>
              <span className="text-slate-500 font-medium">
                {currentCase.patient.age} yrs • {currentCase.patient.gender}
              </span>
              <span
                className={`font-semibold px-2.5 py-0.5 rounded-full border text-[11px] ${getUrgencyBadge(
                  currentCase.safetyUrgency
                )}`}
              >
                {currentCase.safetyUrgency === "HIGH" ? "High Urgency" : currentCase.safetyUrgency}
              </span>
              <span
                className={`font-medium px-2.5 py-0.5 rounded-full border text-[11px] ${getStatusBadge(
                  currentCase.status
                )}`}
              >
                {currentCase.status === "DELIBERATION"
                  ? "Deliberation"
                  : currentCase.status.replace("_", " ")}
              </span>
            </div>

            {/* Case Title */}
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
              {currentCase.condition}
            </h1>

            {/* Short Clinical Summary */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentCase.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab("governance")}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>Review Governance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab("audit-report")}
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Audit Report</span>
            </button>
          </div>
        </div>

        {/* Patient Profile Sub-Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Anonymized Code
            </span>
            <span className="font-mono text-slate-800 font-semibold mt-0.5 block">
              {currentCase.patient.patientCode}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Admission Date
            </span>
            <span className="text-slate-800 font-medium mt-0.5 block">
              Sep 12, 2026
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Clinical Department
            </span>
            <span className="text-slate-800 font-medium mt-0.5 block">
              Cardiovascular Medicine
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Data Completeness
            </span>
            <span className="text-emerald-700 font-semibold mt-0.5 block">
              {currentCase.clinicalInfo.dataCompleteness}% Verified
            </span>
          </div>
        </div>
      </div>

      {/* 2. CASE PROGRESS SECTION */}
      <div className="clinical-card p-5 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Case Progress
          </h2>
          <span className="text-xs text-blue-700 font-medium">Step 4 of 5</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div
            onClick={() => onNavigateTab("clinical")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Intake</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Clinical records verified
            </span>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => onNavigateTab("ai-insights")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AI Analysis</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Evidence extracted
            </span>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => onNavigateTab("decision-analysis")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Decision Analysis</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              MCDM scored & simulated
            </span>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => onNavigateTab("governance")}
            className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 ring-1 ring-blue-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
              <CircleDot className="w-4 h-4 text-blue-600" />
              <span>Governance</span>
            </div>
            <span className="text-[11px] text-blue-700 mt-1 block font-medium">
              3 of 4 reviews logged
            </span>
          </div>

          {/* Step 5 */}
          <div
            onClick={() => onNavigateTab("final-decision")}
            className="p-3 rounded-xl bg-slate-50/50 border border-slate-200/60 cursor-pointer hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
              <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
              <span>Human Decision</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Awaiting clinician sign-off
            </span>
          </div>
        </div>
      </div>

      {/* 3. PROMINENT: CURRENT ATTENTION */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-amber-900">
                Current Attention: Human Clinical Review Required
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-800">
                Safety Gate
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Ethical conflict detected between immediate urgency vs. long-term survival probability. Multi-stakeholder consensus is currently at 68% with divergent recommendations between the treating and appointed physicians.
            </p>
          </div>
        </div>
      </div>

      {/* 4. CANDIDATE OPTIONS COMPARISON CARDS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Candidate Options
          </h2>
          <button
            onClick={() => onNavigateTab("decision-analysis")}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Compare all criteria</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentCase.options.map((opt) => {
            const isTop = opt.optionCode === topOption.optionCode;
            return (
              <div
                key={opt.id}
                className={`clinical-card p-5 relative flex flex-col justify-between ${
                  isTop ? "border-blue-300 ring-2 ring-blue-50/80 bg-blue-50/10" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center ${
                          isTop
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {opt.optionCode}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Option {opt.optionCode}
                      </span>
                    </div>

                    {isTop && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Highest MCDM Score
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {opt.optionName}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {opt.description}
                  </p>

                  {/* Clean 4 Key Metrics */}
                  <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Expected Benefit
                      </span>
                      <span className="font-semibold text-slate-800">
                        {opt.expectedBenefitRaw} / 10
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Safety & Risk
                      </span>
                      <span className="font-semibold text-slate-800">
                        {opt.safetyRaw} / 10
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Recovery Prob.
                      </span>
                      <span className="font-semibold text-slate-800">
                        {opt.recoveryProbabilityRaw}%
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Urgency Fit
                      </span>
                      <span
                        className={`font-semibold ${
                          opt.urgencyAlignmentRaw === "HIGH" || opt.urgencyAlignmentRaw === "CRITICAL"
                            ? "text-red-700"
                            : "text-slate-800"
                        }`}
                      >
                        {opt.urgencyAlignmentRaw}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onNavigateTab("decision-analysis")}
                    className="w-full py-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer text-center"
                  >
                    View Criteria Analysis
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. DOMINANT NEXT ACTION CTA */}
      <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Next Recommended Action
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Review Multidisciplinary Deliberation & Conflicts
          </h3>
          <p className="text-xs text-slate-500">
            Assess stakeholder positions and examine detected value conflicts before recording the human clinical decision.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab("governance")}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <span>Review Governance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
