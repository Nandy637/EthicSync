"use client";

import React, { useState } from "react";
import { CaseData, DecisionType, UserRole } from "@/types";
import {
  UserCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCheck,
  ShieldCheck,
  Lock,
  ArrowRight,
} from "lucide-react";

interface HumanDecisionViewProps {
  currentCase: CaseData;
  currentRole: UserRole;
  onDecisionCommitted?: () => void;
}

export const HumanDecisionView: React.FC<HumanDecisionViewProps> = ({
  currentCase,
  currentRole,
}) => {
  const { options, finalDecision } = currentCase;

  // Find algorithmic winner (usually Option B or first option)
  const defaultWinner = options.find((o) => o.optionCode === "B") || options[0];

  const [selectedOptId, setSelectedOptId] = useState<string>(
    finalDecision?.humanDecisionId || defaultWinner.id
  );
  const [decisionType, setDecisionType] = useState<DecisionType>(
    finalDecision?.decisionType || "ACCEPT"
  );
  const [overrideText, setOverrideText] = useState<string>(
    finalDecision?.overrideJustification || ""
  );
  const [committed, setCommitted] = useState<boolean>(!!finalDecision);

  const selectedOption = options.find((o) => o.id === selectedOptId);
  const isOverride =
    selectedOptId !== defaultWinner.id || decisionType === "REJECT";

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverride && !overrideText.trim()) return;
    setCommitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <UserCheck2 className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-semibold text-white tracking-tight">
            Human Clinical Authority & Final Decision Portal
          </h2>
        </div>
        <p className="text-xs text-slate-300">
          The attending clinician retains exclusive final legal and ethical
          authority. You may accept, modify, or override the algorithmic recommendation.
        </p>
      </div>

      {/* Algorithmic Baseline vs Decision Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Algorithmic Recommendation
          </span>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-sm flex items-center justify-center">
              {defaultWinner.optionCode}
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">
                Option {defaultWinner.optionCode}: {defaultWinner.optionName}
              </h3>
              <p className="text-xs text-slate-400">
                Endorsed by MCDM scoring and multidisciplinary consensus.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Current Commitment Status
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                committed
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              }`}
            >
              {committed ? "✓" : "!"}
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">
                {committed
                  ? `Final Decision Locked: Option ${selectedOption?.optionCode}`
                  : "Deliberation Pending Clinician Sign-off"}
              </h3>
              <p className="text-xs text-slate-400">
                {committed
                  ? "Recorded in tamper-evident cryptographic audit ledger."
                  : "Awaiting final review & signature."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Decision Portal Form */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Execute Final Clinical Determination</span>
        </h3>

        <form onSubmit={handleCommit} className="space-y-5">
          {/* Step 1: Decision Action Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              1. Select Action Type:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                disabled={committed}
                onClick={() => {
                  setDecisionType("ACCEPT");
                  setSelectedOptId(defaultWinner.id);
                }}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  decisionType === "ACCEPT"
                    ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/40"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ACCEPT (Endorse Algorithmic Winner)</span>
              </button>

              <button
                type="button"
                disabled={committed}
                onClick={() => setDecisionType("MODIFY")}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  decisionType === "MODIFY"
                    ? "bg-sky-500/20 border-sky-500/60 text-sky-300"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/40"
                }`}
              >
                <ArrowRight className="w-4 h-4 text-sky-400" />
                <span>MODIFY (Adopt with Conditions)</span>
              </button>

              <button
                type="button"
                disabled={committed}
                onClick={() => setDecisionType("REJECT")}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  decisionType === "REJECT"
                    ? "bg-rose-500/20 border-rose-500/60 text-rose-300"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/40"
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>REJECT / OVERRIDE (Select Alternate)</span>
              </button>
            </div>
          </div>

          {/* Step 2: Option Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              2. Designated Clinical Treatment Path:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {options.map((opt) => (
                <label
                  key={opt.id}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                    selectedOptId === opt.id
                      ? "bg-sky-500/15 border-sky-500 text-sky-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">
                      Option {opt.optionCode}
                    </span>
                    <input
                      type="radio"
                      name="finalOption"
                      value={opt.id}
                      checked={selectedOptId === opt.id}
                      disabled={committed}
                      onChange={() => setSelectedOptId(opt.id)}
                      className="accent-sky-400"
                    />
                  </div>
                  <span className="font-semibold text-slate-200">
                    {opt.optionName}
                  </span>
                  <span className="text-[11px] text-slate-400 line-clamp-2">
                    {opt.description}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Mandatory Override Justification Box */}
          {isOverride && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Mandatory Human Clinical Override Justification</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                You are deviating from the algorithmic recommendation (Option{" "}
                {defaultWinner.optionCode}). Medical ethics and hospital
                governance mandate recording a clinical rationale in the permanent
                cryptographic audit log.
              </p>
              <textarea
                value={overrideText}
                onChange={(e) => setOverrideText(e.target.value)}
                disabled={committed}
                placeholder="Document your specific clinical rationale (e.g. 'Emergent neurologic deterioration observed during bedside exam makes immediate surgical evacuation dominant over long-term risk models')..."
                rows={3}
                required
                className="w-full bg-slate-900 border border-amber-900/60 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
          )}

          {/* Commit Button */}
          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              {committed ? (
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Snapshot Committed by Attending Clinician</span>
                </span>
              ) : (
                <span>Action will generate a frozen Decision Snapshot.</span>
              )}
            </div>

            {!committed && (
              <button
                type="submit"
                disabled={isOverride && !overrideText.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                <span>Commit & Seal Clinical Decision</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
