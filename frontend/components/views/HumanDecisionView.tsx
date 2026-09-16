"use client";

import React, { useState } from "react";
import { CaseData, DecisionType, UserRole } from "@/types";
import {
  UserCheck2,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Info,
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
  const defaultRecommendation =
    options.find((o) => o.optionCode === "B") || options[0];

  const [decisionMode, setDecisionMode] = useState<"ACCEPT" | "MODIFY" | "SELECT_OTHER">(
    finalDecision?.decisionType === "ACCEPT" ? "ACCEPT" : "ACCEPT"
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    finalDecision?.humanDecisionId || defaultRecommendation.id
  );
  const [justification, setJustification] = useState<string>(
    finalDecision?.overrideJustification || ""
  );
  const [confirmedStatutory, setConfirmedStatutory] = useState<boolean>(false);
  const [committed, setCommitted] = useState<boolean>(!!finalDecision);

  const chosenOption =
    options.find((o) => o.id === selectedOptionId) || defaultRecommendation;

  const handleRecordDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!justification.trim() && decisionMode !== "ACCEPT") return;
    setCommitted(true);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Final Human Decision & Clinical Authority
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review automated evidence synthesis and multidisciplinary inputs to exercise clinical authority.
        </p>
      </div>

      {/* CORE GOVERNANCE PRINCIPLE BANNER */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-blue-950">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <UserCheck2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold block">
              EthicSync Governance Principle:
            </span>
            <span className="text-xs font-medium text-blue-900">
              &ldquo;The final decision is made by the authorized clinician.&rdquo;
            </span>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 hidden sm:block">
          Attending Clinician: Dr. Priya
        </span>
      </div>

      {/* 1. TOP SYSTEM ANALYSIS SUMMARY (Section 17) */}
      <div className="clinical-card p-6 bg-white space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          System Analysis Summary
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Highest MCDM Score */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              Highest MCDM Score
            </span>
            <div className="text-lg font-bold text-blue-600">
              Option {defaultRecommendation.optionCode}
            </div>
            <p className="text-[11px] text-slate-600 truncate">
              {defaultRecommendation.optionName}
            </p>
          </div>

          {/* Card 2: Decision Robustness */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              Decision Robustness
            </span>
            <div className="text-lg font-bold text-emerald-600">
              90.6%
            </div>
            <p className="text-[11px] text-slate-600">
              Unchanged in 4,530 / 5,000 runs
            </p>
          </div>

          {/* Card 3: Stakeholder Consensus */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              Stakeholder Consensus
            </span>
            <div className="text-lg font-bold text-blue-600">
              68%
            </div>
            <p className="text-[11px] text-slate-600">
              3 of 4 reviews logged
            </p>
          </div>

          {/* Card 4: Safety Gate */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
            <span className="text-[10px] text-amber-700 uppercase font-semibold block">
              Safety Gate Status
            </span>
            <div className="text-base font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Human Review Required</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Urgency vs Benefit conflict
            </p>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY ANCHOR: CLINICIAN DECISION PANEL */}
      <div className="clinical-card p-6 md:p-8 bg-white space-y-6 border-blue-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Clinician Decision Portal
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your determination and record clinical justification into the tamper-evident ledger.
            </p>
          </div>

          {committed && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Decision Recorded
            </span>
          )}
        </div>

        {committed ? (
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Final Clinical Decision Recorded Successfully</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Action: <strong className="font-semibold">{decisionMode}</strong> • Selected:{" "}
              <strong>Option {chosenOption.optionCode}: {chosenOption.optionName}</strong>
            </p>
            {justification && (
              <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block mb-1">
                  Clinical Justification:
                </span>
                {justification}
              </div>
            )}
            <div className="pt-2 text-[11px] text-emerald-700 flex items-center justify-between">
              <span>Authorized Sign-off: Dr. Priya (Treating Doctor)</span>
              <span>SHA-256 Chained Event ID: EVT-94829</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRecordDecision} className="space-y-6">
            {/* Radio Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Decision Type
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Choice 1: Accept */}
                <label
                  onClick={() => {
                    setDecisionMode("ACCEPT");
                    setSelectedOptionId(defaultRecommendation.id);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    decisionMode === "ACCEPT"
                      ? "bg-blue-50/80 border-blue-500 ring-1 ring-blue-500"
                      : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Accept Recommendation
                    </span>
                    <input
                      type="radio"
                      name="decisionType"
                      checked={decisionMode === "ACCEPT"}
                      onChange={() => {}}
                      className="accent-blue-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Proceed with Option {defaultRecommendation.optionCode} (Optimal Medical Therapy).
                  </p>
                </label>

                {/* Choice 2: Modify */}
                <label
                  onClick={() => setDecisionMode("MODIFY")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    decisionMode === "MODIFY"
                      ? "bg-blue-50/80 border-blue-500 ring-1 ring-blue-500"
                      : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Modify Recommendation
                    </span>
                    <input
                      type="radio"
                      name="decisionType"
                      checked={decisionMode === "MODIFY"}
                      onChange={() => {}}
                      className="accent-blue-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Adapt protocol with clinical stipulations and monitoring thresholds.
                  </p>
                </label>

                {/* Choice 3: Select Other */}
                <label
                  onClick={() => setDecisionMode("SELECT_OTHER")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    decisionMode === "SELECT_OTHER"
                      ? "bg-blue-50/80 border-blue-500 ring-1 ring-blue-500"
                      : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Select Another Option
                    </span>
                    <input
                      type="radio"
                      name="decisionType"
                      checked={decisionMode === "SELECT_OTHER"}
                      onChange={() => {}}
                      className="accent-blue-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Exercise clinical override in favor of Option A or Option C.
                  </p>
                </label>
              </div>
            </div>

            {/* Option Selection if Modifying or Selecting Other */}
            {(decisionMode === "MODIFY" || decisionMode === "SELECT_OTHER") && (
              <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Select Clinically Preferred Candidate Option
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        selectedOptionId === opt.id
                          ? "bg-white border-blue-500 font-semibold shadow-2xs"
                          : "bg-white/60 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          Option {opt.optionCode}
                        </span>
                        {opt.optionCode === "B" && (
                          <span className="text-[9px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                            MCDM Top
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 truncate">
                        {opt.optionName}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Decision Justification Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Decision Justification & Clinical Rationale
              </label>
              <textarea
                rows={4}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Document clinical rationale, trial evidence considerations, patient preference, and risk mitigation plan..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all leading-relaxed"
                required={decisionMode !== "ACCEPT"}
              />
              <p className="text-[11px] text-slate-400">
                This rationale will be archived in the tamper-evident audit ledger and included in the governance report.
              </p>
            </div>

            {/* Statutory Confirmation Checkbox */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs">
              <input
                type="checkbox"
                id="statutoryCheck"
                checked={confirmedStatutory}
                onChange={(e) => setConfirmedStatutory(e.target.checked)}
                className="mt-0.5 accent-blue-600 rounded cursor-pointer"
                required
              />
              <label
                htmlFor="statutoryCheck"
                className="text-slate-700 leading-snug cursor-pointer select-none"
              >
                I confirm that as the authorized treating physician, I have evaluated the AI evidence, multi-criteria scoring, and multidisciplinary stakeholder deliberations to arrive at this independent clinical determination.
              </label>
            </div>

            {/* ONE STRONG CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!confirmedStatutory}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                  confirmedStatutory
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>Record Final Decision</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
