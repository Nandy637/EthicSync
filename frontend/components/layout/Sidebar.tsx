"use client";

import React from "react";
import { UserRole } from "@/types";
import {
  Home,
  FolderKanban,
  FileText,
  Stethoscope,
  BrainCircuit,
  Scale,
  UserCheck2,
  FileCheck2,
  Settings,
  HelpCircle,
  SlidersHorizontal,
  ChevronDown,
  Layers,
} from "lucide-react";
import { NavTabId } from "./CaseContextBar";

interface SidebarProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  currentRole: UserRole;
  conflictsCount: number;
  safetyEventsCount: number;
  hasSelectedCase: boolean;
  onOpenSupportModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  conflictsCount,
  safetyEventsCount,
  hasSelectedCase,
  onOpenSupportModal,
}) => {
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-200/80 p-4 hidden md:flex flex-col justify-between transition-colors">
      <div className="space-y-6">
        {/* Top Section: Main Navigation */}
        <div className="space-y-1">
          {/* HOME */}
          <button
            onClick={() => onTabChange("home")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "home"
                ? "bg-blue-600 text-white font-semibold shadow-xs"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <Home
              className={`w-4 h-4 ${
                activeTab === "home" ? "text-white" : "text-slate-500"
              }`}
            />
            <span>Home</span>
          </button>

          {/* CASES SECTION */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Cases</span>
            </div>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => onTabChange("cases-all")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "cases-all"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderKanban
                    className={`w-4 h-4 ${
                      activeTab === "cases-all" ? "text-blue-600" : "text-slate-500"
                    }`}
                  />
                  <span>All Cases</span>
                </div>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  12
                </span>
              </button>

              <button
                onClick={() => onTabChange("cases-my")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "cases-my"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers
                    className={`w-4 h-4 ${
                      activeTab === "cases-my" ? "text-blue-600" : "text-slate-500"
                    }`}
                  />
                  <span>My Cases</span>
                </div>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                  5
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* CURRENT CASE SECTION (Appears when a case is active) */}
        {hasSelectedCase && (
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Current Case</span>
            </div>

            <div className="space-y-0.5 mt-1">
              {/* Overview */}
              <button
                onClick={() => onTabChange("overview")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "overview"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <FileText
                  className={`w-4 h-4 ${
                    activeTab === "overview" ? "text-blue-600" : "text-slate-500"
                  }`}
                />
                <span>Overview</span>
              </button>

              {/* Clinical Data */}
              <button
                onClick={() => onTabChange("clinical")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "clinical"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Stethoscope
                    className={`w-4 h-4 ${
                      activeTab === "clinical" ? "text-blue-600" : "text-slate-500"
                    }`}
                  />
                  <span>Clinical Data</span>
                </div>
                {safetyEventsCount > 0 && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                    Gate
                  </span>
                )}
              </button>

              {/* AI & Evidence */}
              <button
                onClick={() => onTabChange("ai-insights")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "ai-insights"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <BrainCircuit
                  className={`w-4 h-4 ${
                    activeTab === "ai-insights" ? "text-purple-600" : "text-slate-500"
                  }`}
                />
                <span>AI & Evidence</span>
              </button>

              {/* Decision Analysis */}
              <button
                onClick={() => onTabChange("decision-analysis")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "decision-analysis"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <SlidersHorizontal
                  className={`w-4 h-4 ${
                    activeTab === "decision-analysis" ? "text-blue-600" : "text-slate-500"
                  }`}
                />
                <span>Decision Analysis</span>
              </button>

              {/* Governance */}
              <button
                onClick={() => onTabChange("governance")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "governance"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Scale
                    className={`w-4 h-4 ${
                      activeTab === "governance" ? "text-amber-600" : "text-slate-500"
                    }`}
                  />
                  <span>Governance</span>
                </div>
                {conflictsCount > 0 && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    {conflictsCount} Conflict
                  </span>
                )}
              </button>

              {/* Final Decision */}
              <button
                onClick={() => onTabChange("final-decision")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "final-decision"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <UserCheck2
                  className={`w-4 h-4 ${
                    activeTab === "final-decision" ? "text-emerald-600" : "text-slate-500"
                  }`}
                />
                <span>Final Decision</span>
              </button>

              {/* Audit & Report */}
              <button
                onClick={() => onTabChange("audit-report")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "audit-report"
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <FileCheck2
                  className={`w-4 h-4 ${
                    activeTab === "audit-report" ? "text-blue-600" : "text-slate-500"
                  }`}
                />
                <span>Audit & Report</span>
              </button>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => onTabChange("settings")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === "settings"
                ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            <Settings
              className={`w-4 h-4 ${
                activeTab === "settings" ? "text-blue-600" : "text-slate-500"
              }`}
            />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Bottom Help Support Card */}
      <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-slate-900">Need help?</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          View clinical decision guides or contact ethics support.
        </p>
        <button
          onClick={onOpenSupportModal}
          className="w-full py-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-50 border border-blue-200 text-[11px] font-semibold text-blue-700 text-center transition-colors shadow-2xs"
        >
          Get Support
        </button>
      </div>
    </aside>
  );
};
