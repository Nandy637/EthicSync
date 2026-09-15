"use client";

import React from "react";
import { CaseData, UserRole } from "@/types";
import {
  ShieldAlert,
  Clock,
  User,
  Activity,
  Calendar,
  AlertTriangle,
  FileBadge,
  ArrowRight,
} from "lucide-react";

interface OverviewViewProps {
  currentCase: CaseData;
  onNavigateTab: (tab: any) => void;
  currentRole: UserRole;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  currentCase,
  onNavigateTab,
}) => {
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "CRITICAL":
        return "bg-rose-950/80 border-rose-700 text-rose-300 animate-pulse";
      case "HIGH":
        return "bg-amber-950/80 border-amber-700 text-amber-300";
      case "MODERATE":
        return "bg-yellow-950/60 border-yellow-800 text-yellow-300";
      default:
        return "bg-emerald-950/60 border-emerald-800 text-emerald-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <span className="text-xs font-mono text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-800/60">
                {currentCase.id}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getUrgencyBadge(
                  currentCase.safetyUrgency
                )}`}
              >
                Urgency: {currentCase.safetyUrgency}
              </span>
              <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                Status: {currentCase.status.replace("_", " ")}
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {currentCase.condition}
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {currentCase.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab("decision")}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              <span>Review Decision Gate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab("report")}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
            >
              <FileBadge className="w-3.5 h-3.5 text-sky-400" />
              <span>Generate Audit Report</span>
            </button>
          </div>
        </div>

        {/* Patient Profile Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <User className="w-4 h-4 text-sky-400" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Anonymized Code
              </span>
              <span className="font-mono text-slate-200 font-medium">
                {currentCase.patient.patientCode}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Demographics
              </span>
              <span className="text-slate-200 font-medium">
                {currentCase.patient.age} yrs • {currentCase.patient.gender}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Intake Timestamp
              </span>
              <span className="text-slate-200 font-medium">
                {new Date(currentCase.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Completeness
              </span>
              <span className="text-slate-200 font-medium">
                {currentCase.clinicalInfo.dataCompleteness}% verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts Banner if Human Review is required */}
      {currentCase.humanReviewRequired && (
        <div className="glass-card rounded-2xl p-5 border border-rose-800/60 bg-rose-950/30 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-400 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-rose-200">
                Safety Gate Active — Mandatory Human Clinical Review Required
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-900/80 text-rose-300 border border-rose-700">
                Action Required
              </span>
            </div>
            <p className="text-xs text-rose-300/80 mt-1">
              Automated finalization is blocked by deterministic safety engine
              triggers. Active triggers:
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {currentCase.reviewReasons.map((reason, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700/60 text-rose-200"
                >
                  {reason}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Options Quick Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white tracking-tight">
            Candidate Clinical Options ({currentCase.options.length})
          </h2>
          <span className="text-xs text-slate-400">
            Governed by Multi-Criteria Decision Model (MCDM)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentCase.options.map((opt) => (
            <div
              key={opt.id}
              className="glass-card glass-card-hover rounded-xl p-4 border border-slate-800/80 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center justify-center">
                    {opt.optionCode}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Urgency: {opt.urgencyAlignmentRaw}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {opt.optionName}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-3">
                  {opt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block font-medium">Expected Benefit</span>
                  <span className="text-emerald-400 font-semibold">
                    {opt.expectedBenefitRaw} / 10
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Recovery Prob</span>
                  <span className="text-sky-400 font-semibold">
                    {opt.recoveryProbabilityRaw}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
