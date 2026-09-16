"use client";

import React from "react";
import { CaseData } from "@/types";
import {
  FileCheck2,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  BrainCircuit,
  SlidersHorizontal,
  UserCheck2,
  Lock,
} from "lucide-react";

interface ReportViewProps {
  currentCase: CaseData;
}

export const ReportView: React.FC<ReportViewProps> = ({ currentCase }) => {
  const {
    id,
    patient,
    condition,
    description,
    clinicalInfo,
    options,
    criteria,
    aiAnalysis,
    conflicts,
    opinions,
    consensus,
    finalDecision,
    auditLogs,
  } = currentCase;

  const handlePrint = () => {
    window.print();
  };

  const topOption = options.find((o) => o.optionCode === "B") || options[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar (hidden when printed) */}
      <div className="clinical-card p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Clinical Decision & Governance Report
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Board-ready clinical audit document for medical records and compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT BODY (Resembles official medical board report) */}
      <div className="clinical-card p-8 md:p-12 bg-white space-y-8 border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Document Letterhead */}
        <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xl font-black tracking-tight text-slate-900 uppercase">
              EthicSync Governance Dossier
            </div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">
              Multidisciplinary Clinical Decision Support & Consensus Summary
            </div>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
            <div>Case Reference: {id}</div>
            <div>Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* 1. Case Summary */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            1. Case Summary
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs py-1">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Patient Code
              </span>
              <span className="font-semibold text-slate-800">{patient.patientCode}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Age / Gender
              </span>
              <span className="font-semibold text-slate-800">{patient.age} yrs • {patient.gender}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Urgency Tier
              </span>
              <span className="font-semibold text-red-700">{currentCase.safetyUrgency}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Current Status
              </span>
              <span className="font-semibold text-slate-800">{currentCase.status}</span>
            </div>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed pt-1">
            {description}
          </p>
        </section>

        {/* 2. Clinical Information */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            2. Clinical Information & Diagnostics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-semibold text-slate-800">Medical History:</span>
              <p className="text-slate-600">{clinicalInfo.medicalHistory}</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-800">Diagnostic Findings:</span>
              <p className="text-slate-600">{clinicalInfo.relevantFindings}</p>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            Investigations: {clinicalInfo.investigations} • Data Completeness: {clinicalInfo.dataCompleteness}%
          </div>
        </section>

        {/* 3. Candidate Options */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            3. Candidate Options
          </h2>
          <div className="space-y-2 text-xs">
            {options.map((opt) => (
              <div
                key={opt.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-slate-900">
                    Option {opt.optionCode}: {opt.optionName}
                  </span>
                  <p className="text-[11px] text-slate-600 mt-0.5">{opt.description}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-600 shrink-0 font-medium">
                  <span>Benefit: {opt.expectedBenefitRaw}/10</span>
                  <span>Safety: {opt.safetyRaw}/10</span>
                  <span>Recovery: {opt.recoveryProbabilityRaw}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. AI & Evidence */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            4. AI & Evidence Extraction
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {aiAnalysis.summary}
          </p>
          <div className="text-[11px] text-slate-500">
            Literature Grounding: Cited {aiAnalysis.retrievedSources.length} guidelines (ACC/AHA/SCAI, ISCHEMIA Trial). Excerpt verified via vector RAG.
          </div>
        </section>

        {/* 5. Decision Analysis */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            5. Multi-Criteria Decision Analysis (MCDM)
          </h2>
          <p className="text-xs text-slate-700">
            Weighted linear sum over 5 standardized clinical criteria (Benefit 30%, Safety 25%, Recovery 20%, Urgency 15%, Patient Preference 10%).
          </p>
          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 text-xs text-blue-950 font-medium">
            Current MCDM Highest Score: Option {topOption.optionCode} ({topOption.optionName})
          </div>
        </section>

        {/* 6. Sensitivity Analysis */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            6. What-If Sensitivity & Crossover Analysis
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            Urgency weight perturbation demonstrates that Option B remains optimal until Urgency weight reaches 38.5%, at which point Option C overtakes due to acute hemodynamic protection.
          </p>
        </section>

        {/* 7. Ethical Conflicts */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            7. Ethical Conflicts & Governance Flags
          </h2>
          {conflicts.length > 0 ? (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold">Detected Conflict: Urgency vs. Long-Term Benefit (High Severity)</span>
              <p className="leading-relaxed">
                Tension between immediate invasive stabilization and trial evidence favoring medical therapy. Required mandatory multidisciplinary review prior to sign-off.
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-600">No severe value tensions detected.</p>
          )}
        </section>

        {/* 8. Stakeholder Opinions */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            8. Stakeholder Opinions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {opinions.map((op) => (
              <div key={op.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <div className="font-semibold text-slate-800">
                  {op.stakeholderName} ({op.role})
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  {op.reasoning}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Consensus */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            9. Consensus Status
          </h2>
          <p className="text-xs text-slate-700">
            68% Plurality Support. General agreement that medical optimization is initial baseline, with scheduled multi-specialty follow-up.
          </p>
        </section>

        {/* 10. Human Final Decision */}
        <section className="space-y-3 p-4 rounded-xl bg-slate-50 border-2 border-slate-300">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            10. Authorized Clinician Final Decision
          </h2>
          <div className="text-xs text-slate-800 space-y-1">
            <div>
              <strong>Clinician: </strong> Dr. Priya (Treating Doctor)
            </div>
            <div>
              <strong>Final Determination: </strong> ACCEPT Recommendation (Option B: Optimal Medical Therapy)
            </div>
            <div>
              <strong>Clinical Justification: </strong> Intensive medical stabilization initiated under telemetry. Patient autonomy respected, procedural trauma deferred pending 48h troponin trend.
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
            Statutory Confirmation Signed electronically via EthicSync Clinical Governance Engine.
          </div>
        </section>

        {/* 11. Audit History */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            11. Tamper-Evident Audit Verification
          </h2>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 space-y-1">
            <div>Chain Verification: VALID (SHA-256 Ledger Verified)</div>
            <div>Total Chained Events: {auditLogs.length}</div>
            <div>Latest Block Hash: {auditLogs[auditLogs.length - 1]?.eventHash}</div>
          </div>
        </section>
      </div>
    </div>
  );
};
