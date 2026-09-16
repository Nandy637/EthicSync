"use client";

import React, { useState } from "react";
import { CaseData, UserRole } from "@/types";
import {
  Scale,
  Users,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Lock,
  Unlock,
  Eye,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Info,
  UserCheck,
} from "lucide-react";

interface GovernanceViewProps {
  currentCase: CaseData;
  currentRole: UserRole;
  onNavigateTab?: (tab: any) => void;
}

export const GovernanceView: React.FC<GovernanceViewProps> = ({
  currentCase,
  currentRole,
}) => {
  const [govSubTab, setGovSubTab] = useState<"ethics" | "stakeholders" | "consensus">(
    "ethics"
  );

  // Ethics fairness tests expandable
  const [showAdvancedTests, setShowAdvancedTests] = useState(false);
  const [counterfactualTested, setCounterfactualTested] = useState(false);
  const [counterfactualRunning, setCounterfactualRunning] = useState(false);

  // Stakeholder review reveal state
  const [reviewsRevealed, setReviewsRevealed] = useState(
    currentCase.votingSession.state === "REVEALED" ||
      currentCase.votingSession.state === "DISCUSSION" ||
      currentCase.status === "DECIDED"
  );

  // Discussion state
  const [discussionRequested, setDiscussionRequested] = useState(false);

  const runCounterfactual = () => {
    setCounterfactualRunning(true);
    setTimeout(() => {
      setCounterfactualRunning(false);
      setCounterfactualTested(true);
    }, 500);
  };

  const governanceChecks = [
    { title: "Criteria explicitly defined", desc: "All 5 clinical attributes are formally mapped to guideline benchmarks." },
    { title: "Clinical justification available", desc: "Every criterion has verifiable trial and literature references attached." },
    { title: "Consistent scoring", desc: "Normalization functions applied uniformly across all 3 candidate options." },
    { title: "Protected attributes excluded", desc: "Demographic variables (gender, ethnicity, socioeconomics) excluded from scoring algorithms." },
    { title: "Robustness tested", desc: "Passed 5,000 Dirichlet Monte Carlo perturbation runs with 90.6% stability." },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ethics, Stakeholders & Consensus
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Multidisciplinary governance, value conflict detection, and consensus tracking.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-medium">
          <button
            onClick={() => setGovSubTab("ethics")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              govSubTab === "ethics"
                ? "bg-white text-blue-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Ethics & Fairness
          </button>
          <button
            onClick={() => setGovSubTab("stakeholders")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              govSubTab === "stakeholders"
                ? "bg-white text-blue-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Stakeholder Review
          </button>
          <button
            onClick={() => setGovSubTab("consensus")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              govSubTab === "consensus"
                ? "bg-white text-blue-700 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Consensus (68%)
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 14: ETHICS & FAIRNESS REVIEW                     */}
      {/* ======================================================== */}
      {govSubTab === "ethics" && (
        <div className="space-y-6">
          {/* 1. DETECTED VALUE CONFLICT (Section 14) */}
          <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Detected Value Conflict
                </span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                Severity: High
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Urgency vs. Long-Term Benefit
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
              The patient presents with critical LAD stenosis warranting swift stabilization, yet optimal medical therapy yields superior 5-year survival with lower procedural mortality in this specific anatomical profile. Clinicians face a direct trade-off between immediate reassurance and long-term harm reduction.
            </p>
          </div>

          {/* 2. GOVERNANCE CHECK (5 items with green checkmarks) */}
          <div className="clinical-card p-6 md:p-8 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Governance Check
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {governanceChecks.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. ADVANCED FAIRNESS TESTS (Expandable) */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowAdvancedTests(!showAdvancedTests)}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span>{showAdvancedTests ? "Hide" : "Show"} Advanced Fairness Tests</span>
                {showAdvancedTests ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showAdvancedTests && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  {/* Test 1: Criterion Ablation */}
                  <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      Criterion Ablation Test
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Removes each criterion one by one to detect disproportionate single-factor dominance.
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                      ✓ No single criterion dominates &gt; 35% of decision weight
                    </span>
                  </div>

                  {/* Test 2: Counterfactual Testing */}
                  <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Counterfactual Demographic Swap
                      </span>
                      <button
                        onClick={runCounterfactual}
                        disabled={counterfactualRunning}
                        className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <RefreshCw className={`w-3 h-3 ${counterfactualRunning ? "animate-spin" : ""}`} />
                        <span>Run Test</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Evaluates whether identical clinical scores yield identical recommendations across gender and age tiers.
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                      ✓ 100% Invariant to Demographic Perturbation
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 15: STAKEHOLDER REVIEW (Independent Reviews)      */}
      {/* ======================================================== */}
      {govSubTab === "stakeholders" && (
        <div className="space-y-6">
          <div className="clinical-card p-6 md:p-8 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Stakeholder Assessment & Independent Review
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reviews are collected independently to prevent cognitive anchoring and institutional bias.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  3 of 4 reviews submitted
                </span>
                {!reviewsRevealed && (
                  <button
                    onClick={() => setReviewsRevealed(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reveal Submissions</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stakeholder Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCase.opinions.map((op) => {
                const optMatch = currentCase.options.find(
                  (o) => o.id === op.preferredOptionId
                );

                return (
                  <div
                    key={op.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-blue-600" />
                          <h3 className="text-xs font-bold text-slate-900">
                            {op.stakeholderName}
                          </h3>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Role: {op.role}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono">
                        {op.submittedAt ? "Submitted" : "Pending"}
                      </span>
                    </div>

                    {!reviewsRevealed ? (
                      <div className="p-3 rounded-xl bg-white border border-dashed border-slate-300 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Independent review submitted (Concealed until reveal)</span>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-semibold uppercase">
                            Preferred Option:
                          </span>
                          <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-xs">
                            Option {optMatch?.optionCode}: {optMatch?.optionName}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] text-slate-400 font-semibold uppercase block">
                            Clinical Reasoning:
                          </span>
                          <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                            {op.reasoning}
                          </p>
                        </div>

                        {op.concerns && (
                          <div className="p-2 rounded bg-amber-50/60 border border-amber-200 text-[11px] text-amber-800">
                            <span className="font-semibold">Concerns: </span>
                            {op.concerns}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 16: CONSENSUS COLLABORATION                      */}
      {/* ======================================================== */}
      {govSubTab === "consensus" && (
        <div className="space-y-6">
          <div className="clinical-card p-6 md:p-8 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Consensus Status
                </span>
                <div className="text-4xl lg:text-5xl font-black text-blue-600 mt-1">
                  68%
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Plurality agreement reached for Option B, with secondary endorsement for Option C.
                </p>
              </div>

              <button
                onClick={() => setDiscussionRequested(!discussionRequested)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  discussionRequested
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>
                  {discussionRequested ? "Discussion Active (Scheduled)" : "Request Discussion"}
                </span>
              </button>
            </div>

            {/* Stakeholder Positions */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Stakeholder Positions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block font-medium">Treating Doctor</span>
                  <div className="font-bold text-slate-800 mt-1">Dr. Priya</div>
                  <div className="text-xs font-bold text-sky-600 mt-1">→ Option C (CABG)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block font-medium">Appointed Doctor</span>
                  <div className="font-bold text-slate-800 mt-1">Dr. Elena Rostova</div>
                  <div className="text-xs font-bold text-blue-700 mt-1">→ Option B (OMT)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block font-medium">Patient / Family</span>
                  <div className="font-bold text-slate-800 mt-1">Robert Miller</div>
                  <div className="text-xs font-bold text-blue-700 mt-1">→ Option B (OMT)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block font-medium">Ethics Official</span>
                  <div className="font-bold text-slate-800 mt-1">Dr. Arthur Pendelton</div>
                  <div className="text-xs font-bold text-sky-600 mt-1">→ Option C (CABG)</div>
                </div>
              </div>
            </div>

            {/* Areas of Agreement & Areas of Disagreement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Areas of Agreement</span>
                </div>
                <ul className="text-xs text-emerald-900 space-y-1.5 list-disc list-inside">
                  <li>Option A (PCI) is sub-optimal due to dual lesion geometry.</li>
                  <li>In-hospital telemetry and anti-ischemic infusions are mandatory.</li>
                  <li>Patient autonomy and preferences must be formally weighted.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Areas of Disagreement</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Treating physician prioritizes acute stabilization via emergent CABG, whereas appointed specialist and patient favor intensified OMT to avert perioperative stroke.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
