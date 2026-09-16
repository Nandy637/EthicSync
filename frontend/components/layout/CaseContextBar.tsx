"use client";

import React from "react";
import { CaseData } from "@/types";
import {
  CheckCircle2,
  AlertTriangle,
  CircleDot,
  ChevronRight,
  Layers,
  ArrowLeft,
  User,
  ShieldAlert,
} from "lucide-react";
import { MOCK_CASES } from "@/lib/mockData";

export type NavTabId =
  | "home"
  | "cases-all"
  | "cases-my"
  | "overview"
  | "clinical"
  | "ai-insights"
  | "decision-analysis"
  | "governance"
  | "final-decision"
  | "audit-report"
  | "settings";

interface CaseContextBarProps {
  currentCase: CaseData;
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  onCaseChange: (caseId: string) => void;
  onBackToHome?: () => void;
}

export const CaseContextBar: React.FC<CaseContextBarProps> = ({
  currentCase,
  activeTab,
  onTabChange,
  onCaseChange,
}) => {
  const steps = [
    {
      id: "clinical" as NavTabId,
      label: "Clinical Intake",
      status: "completed",
    },
    {
      id: "ai-insights" as NavTabId,
      label: "AI Analysis",
      status: "completed",
    },
    {
      id: "decision-analysis" as NavTabId,
      label: "Decision Analysis",
      status: currentCase.status === "DECIDED" ? "completed" : "current",
    },
    {
      id: "governance" as NavTabId,
      label: "Governance",
      status:
        currentCase.status === "DECIDED"
          ? "completed"
          : currentCase.conflicts.length > 0
          ? "warning"
          : "pending",
    },
    {
      id: "final-decision" as NavTabId,
      label: "Human Decision",
      status: currentCase.status === "DECIDED" ? "completed" : "pending",
    },
  ];

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

  return (
    <div className="bg-white border-b border-slate-200/90 shadow-2xs px-4 lg:px-8 py-2.5 transition-colors">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Current Case Details & Case Switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Quick Case Switcher */}
          <div className="relative flex items-center">
            <select
              value={currentCase.id}
              onChange={(e) => onCaseChange(e.target.value)}
              aria-label="Select Clinical Case Scenario"
              className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 pl-2.5 pr-7 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              {MOCK_CASES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} • {c.condition.split("(")[0]}
                </option>
              ))}
            </select>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none rotate-90" />
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Condition & Demographics */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-900">
              {currentCase.condition}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {currentCase.patient.age} yrs • {currentCase.patient.gender}
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getUrgencyBadge(
                currentCase.safetyUrgency
              )}`}
            >
              {currentCase.safetyUrgency === "HIGH" ? "High Urgency" : currentCase.safetyUrgency}
            </span>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getStatusBadge(
                currentCase.status
              )}`}
            >
              {currentCase.status === "DELIBERATION"
                ? "Under Deliberation"
                : currentCase.status.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Right: 5-Step Progress Tracker */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {steps.map((step, idx) => {
            const isStepActive = activeTab === step.id;
            const isCompleted = step.status === "completed";
            const isWarning = step.status === "warning";

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
                <button
                  onClick={() => onTabChange(step.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    isStepActive
                      ? "bg-blue-50 text-blue-700 border border-blue-300 shadow-2xs font-semibold"
                      : isCompleted
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      : isWarning
                      ? "text-amber-700 bg-amber-50/70 hover:bg-amber-50 border border-amber-200"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : isStepActive ? (
                    <CircleDot className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span>{step.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
