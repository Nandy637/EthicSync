"use client";

import React from "react";
import { UserRole } from "@/types";
import {
  ShieldAlert,
  Sparkles,
  UserCheck,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedCaseId: string;
  onCaseChange: (caseId: string) => void;
  caseCount: number;
  activeSafetyEventsCount: number;
  isAuditChainValid: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  selectedCaseId,
  onCaseChange,
  activeSafetyEventsCount,
  isAuditChainValid,
}) => {
  const roles: UserRole[] = [
    "Treating Doctor",
    "Appointed Doctor",
    "Medical/Ethics Official",
    "Patient",
    "Admin",
  ];

  const casePresets = [
    { id: "CASE-001", label: "Case 1: Stable Consensus (CAD)" },
    { id: "CASE-002", label: "Case 2: High Ethical Conflict (ACS)" },
    { id: "CASE-003", label: "Case 3: Unstable Decision (AAA)" },
    { id: "CASE-004", label: "Case 4: Severe Disagreement (Oncology)" },
    { id: "CASE-005", label: "Case 5: Missing Data Gate (Sepsis)" },
    { id: "CASE-006", label: "Case 6: Human Override (Hematoma)" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md px-4 lg:px-6 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-emerald-500/20 border border-sky-500/30 glow-cyan">
            <Activity className="w-5 h-5 text-sky-400" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-indigo-200 to-white">
                EthicSync
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-300">
                Governance Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Explainable Clinical Decision Support & Consensus Platform
            </p>
          </div>
        </div>

        {/* Global Controls & Statuses */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Active Synthetic Demo Preset Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-lg p-1">
            <Layers className="w-3.5 h-3.5 text-sky-400 ml-2" />
            <select
              value={selectedCaseId}
              onChange={(e) => onCaseChange(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer py-1 pr-2"
              title="Select Demonstration Case Scenario"
            >
              {casePresets.map((preset) => (
                <option
                  key={preset.id}
                  value={preset.id}
                  className="bg-slate-900 text-slate-200 text-xs"
                >
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-lg p-1">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400 ml-2" />
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer py-1 pr-2"
              title="Switch Perspective / RBAC View"
            >
              {roles.map((r) => (
                <option
                  key={r}
                  value={r}
                  className="bg-slate-900 text-slate-200 text-xs"
                >
                  View as: {r}
                </option>
              ))}
            </select>
          </div>

          {/* Safety Gate Alert Indicator */}
          {activeSafetyEventsCount > 0 ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-medium animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>{activeSafetyEventsCount} Safety Gate Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safety Gated: Clear</span>
            </div>
          )}

          {/* Audit Chain Status Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
              isAuditChainValid
                ? "bg-sky-950/40 border-sky-800/50 text-sky-300"
                : "bg-red-950/70 border-red-700 text-red-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>SHA-256 Ledger Verified</span>
          </div>
        </div>
      </div>
    </header>
  );
};
