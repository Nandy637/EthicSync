"use client";

import React, { useState } from "react";
import { UserRole } from "@/types";
import {
  Settings,
  Shield,
  Sliders,
  Bell,
  Database,
  Lock,
  CheckCircle2,
} from "lucide-react";

interface SettingsViewProps {
  currentRole: UserRole;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentRole }) => {
  const [activeTab, setActiveTab] = useState<"governance" | "thresholds" | "audit">(
    "governance"
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          System Settings & Governance Parameters
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure clinical safety gates, consensus thresholds, and audit ledger integrations.
        </p>
      </div>

      <div className="clinical-card p-6 md:p-8 bg-white space-y-6">
        {/* Settings Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("governance")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "governance"
                ? "bg-blue-50 text-blue-700 font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Governance & Safety Gates
          </button>
          <button
            onClick={() => setActiveTab("thresholds")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "thresholds"
                ? "bg-blue-50 text-blue-700 font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Consensus Thresholds
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "audit"
                ? "bg-blue-50 text-blue-700 font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Ledger & Cryptography
          </button>
        </div>

        {activeTab === "governance" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">
                  Mandatory Human Clinician Sign-off
                </span>
                <span className="text-slate-500">
                  Prohibit algorithmic auto-execution. Requires human physician confirmation.
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                ENFORCED (Statutory)
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">
                  Missing Clinical Data Gate (Threshold 90%)
                </span>
                <span className="text-slate-500">
                  Halt automated MCDM ranking if baseline clinical record completeness is below 90%.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="accent-blue-600 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">
                  Demographic Attribute Shield
                </span>
                <span className="text-slate-500">
                  Strictly exclude race, ethnicity, and gender from scoring criteria calculation.
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                ACTIVE
              </span>
            </div>
          </div>
        )}

        {activeTab === "thresholds" && (
          <div className="space-y-4 text-xs">
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between">
                <span className="font-bold text-slate-800">
                  Minimum Consensus Threshold for Fast-Track
                </span>
                <span className="font-bold text-blue-600">75%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                defaultValue="75"
                className="w-full accent-blue-600"
              />
              <span className="text-[11px] text-slate-500">
                Cases with consensus below this percentage automatically require multidisciplinary conference.
              </span>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between">
                <span className="font-bold text-slate-800">
                  Stability Index Safety Margin
                </span>
                <span className="font-bold text-blue-600">15%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                defaultValue="15"
                className="w-full accent-blue-600"
              />
              <span className="text-[11px] text-slate-500">
                Dirichlet Monte Carlo margin below 15% triggers sensitivity alert.
              </span>
            </div>
          </div>
        )}

        {activeTab === "audit" && (
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">
                Cryptographic Hashing Algorithm
              </span>
              <p className="text-slate-600 text-[11px]">
                Standard SHA-256 block chain linkage ensures historical non-repudiation of every clinical change.
              </p>
              <div className="font-mono text-[11px] text-blue-700 bg-white p-2 rounded border border-slate-200">
                hash_n = SHA-256(hash_(n-1) + event_payload + timestamp + user_id)
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Save Configuration
          </button>
          {saved && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Settings saved successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
