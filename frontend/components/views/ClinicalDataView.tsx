"use client";

import React from "react";
import { CaseData } from "@/types";
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Building2,
  Activity,
  ShieldAlert,
} from "lucide-react";

interface ClinicalDataViewProps {
  currentCase: CaseData;
}

export const ClinicalDataView: React.FC<ClinicalDataViewProps> = ({
  currentCase,
}) => {
  const { clinicalInfo } = currentCase;
  const isComplete = clinicalInfo.dataCompleteness >= 90;

  return (
    <div className="space-y-6">
      {/* Completeness Status Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white tracking-tight">
              Clinical Intake & Completeness Audit
            </h2>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                isComplete
                  ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                  : "bg-rose-950/80 border-rose-700 text-rose-300 animate-pulse"
              }`}
            >
              {isComplete ? "INTAKE VERIFIED" : "CRITICAL DATA MISSING"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Data integrity gate screen performed prior to mathematical option scoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isComplete ? "bg-emerald-400" : "bg-rose-500"
              }`}
              style={{ width: `${clinicalInfo.dataCompleteness}%` }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-slate-200">
            {clinicalInfo.dataCompleteness}%
          </span>
        </div>
      </div>

      {/* Missing Information Alert Box */}
      {clinicalInfo.missingInformation.length > 0 && (
        <div className="glass-card rounded-2xl p-5 border border-rose-800/80 bg-rose-950/40 space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-400 animate-bounce" />
            <span>Missing Mandatory Clinical Information Gate Engaged</span>
          </div>
          <p className="text-xs text-rose-200/90 leading-relaxed">
            The deterministic Missing Data Engine identified omissions in baseline
            records. In accordance with safety protocol, automated option ranking
            is halted until these records are supplied or explicitly overridden by
            the attending physician.
          </p>
          <ul className="space-y-1.5 pl-2">
            {clinicalInfo.missingInformation.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-rose-200 flex items-center gap-2 font-mono"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Clinical Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Medical History */}
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Past Medical & Surgical History</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {clinicalInfo.medicalHistory}
          </p>
        </div>

        {/* Current Status */}
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <span>Current Clinical Status & Symptoms</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {clinicalInfo.currentStatus}
          </p>
        </div>

        {/* Relevant Findings */}
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Relevant Clinical Findings</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {clinicalInfo.relevantFindings}
          </p>
        </div>

        {/* Investigations & Labs */}
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Diagnostic Investigations & Labs</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {clinicalInfo.investigations || "No formal lab records recorded."}
          </p>
        </div>
      </div>

      {/* Current Care */}
      <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-purple-400" />
          <span>Active In-Hospital Interventions & Medications</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          {clinicalInfo.currentCare || "No active interventions charted."}
        </p>
      </div>

      {/* Data Provenance Ledger */}
      <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Verified Data Provenance Trace</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Source Traceability Ledger
          </span>
        </div>

        <div className="divide-y divide-slate-800/60 text-xs">
          {Object.entries(clinicalInfo.dataProvenance).length > 0 ? (
            Object.entries(clinicalInfo.dataProvenance).map(
              ([key, val], idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                  <span className="font-medium text-slate-300">{key}</span>
                  <span className="font-mono text-sky-400 text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    {val}
                  </span>
                </div>
              )
            )
          ) : (
            <p className="text-xs text-slate-400 py-2">
              No formal external lab signatures registered.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
