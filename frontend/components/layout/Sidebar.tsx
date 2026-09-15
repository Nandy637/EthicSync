"use client";

import React from "react";
import { UserRole } from "@/types";
import {
  FileText,
  Stethoscope,
  BrainCircuit,
  Calculator,
  SlidersHorizontal,
  Compass,
  Scale,
  Vote,
  UserCheck2,
  FileCheck2,
  History,
  AlertOctagon,
  Radar,
} from "lucide-react";

export type WorkspaceTab =
  | "overview"
  | "clinical"
  | "ai-insights"
  | "mcdm"
  | "radar"
  | "sensitivity"
  | "stability"
  | "governance"
  | "deliberation"
  | "decision"
  | "audit"
  | "report";

interface SidebarProps {
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  currentRole: UserRole;
  conflictsCount: number;
  safetyEventsCount: number;
  isDeliberationLocked: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  conflictsCount,
  safetyEventsCount,
}) => {
  const navSections = [
    {
      title: "Clinical Intake & Context",
      items: [
        { id: "overview" as WorkspaceTab, label: "Case Overview", icon: FileText },
        {
          id: "clinical" as WorkspaceTab,
          label: "Clinical Data & Missing Info",
          icon: Stethoscope,
          badge: safetyEventsCount > 0 ? "Gate Active" : undefined,
          badgeColor: "text-rose-400 bg-rose-950/60 border-rose-800",
        },
        { id: "ai-insights" as WorkspaceTab, label: "AI & RAG Evidence", icon: BrainCircuit },
      ],
    },
    {
      title: "Deterministic Decision Engine",
      items: [
        { id: "mcdm" as WorkspaceTab, label: "MCDM Matrix (0-1)", icon: Calculator },
        { id: "radar" as WorkspaceTab, label: "Trade-Off Radar Analysis", icon: Radar },
        { id: "sensitivity" as WorkspaceTab, label: "What-If Sensitivity Simulator", icon: SlidersHorizontal },
        { id: "stability" as WorkspaceTab, label: "Stability Index (Dirichlet)", icon: Compass },
      ],
    },
    {
      title: "Governance & Deliberation",
      items: [
        {
          id: "governance" as WorkspaceTab,
          label: "Conflicts & Fairness Screen",
          icon: Scale,
          badge: conflictsCount > 0 ? `${conflictsCount} Active` : undefined,
          badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800",
        },
        { id: "deliberation" as WorkspaceTab, label: "Blind Voting Chamber", icon: Vote },
        { id: "decision" as WorkspaceTab, label: "Human Final Decision", icon: UserCheck2 },
      ],
    },
    {
      title: "Verifiable Accountability",
      items: [
        { id: "audit" as WorkspaceTab, label: "Tamper-Evident Audit", icon: History },
        { id: "report" as WorkspaceTab, label: "Ethical Decision Report", icon: FileCheck2 },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-[#0b101c]/80 backdrop-blur-sm p-4 hidden md:flex flex-col justify-between">
      <div className="space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 px-3">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm shadow-sky-500/10"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-sky-400" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Role Notice */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
          <AlertOctagon className="w-3.5 h-3.5 text-sky-400" />
          <span>Active Role</span>
        </div>
        <p className="text-slate-400">
          Viewing workspace with permissions for <span className="text-sky-300 font-medium">{currentRole}</span>.
        </p>
      </div>
    </aside>
  );
};
