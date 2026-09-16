"use client";

import React from "react";
import { CaseData } from "@/types";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Database,
  Building2,
  Calendar,
  ShieldCheck,
  Stethoscope,
  Info,
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
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Clinical Record & Intake
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Structured patient electronic health record, diagnostic findings, and data provenance.
        </p>
      </div>

      {/* Two-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column (8 cols): Clean Medical Record Document */}
        <div className="lg:col-span-8 clinical-card p-6 md:p-8 space-y-6 bg-white">
          {/* Section: Clinical Summary */}
          <div className="space-y-2 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Clinical Summary</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentCase.description}
            </p>
          </div>

          {/* Section: Medical History */}
          <div className="space-y-2 pb-5 border-b border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Medical History & Comorbidities
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {clinicalInfo.medicalHistory}
            </p>
          </div>

          {/* Section: Current Clinical Status */}
          <div className="space-y-2 pb-5 border-b border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Clinical Status
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {clinicalInfo.currentStatus}
            </p>
          </div>

          {/* Section: Relevant Findings */}
          <div className="space-y-2 pb-5 border-b border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Relevant Findings
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {clinicalInfo.relevantFindings}
            </p>
          </div>

          {/* Section: Investigations */}
          <div className="space-y-2 pb-5 border-b border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Diagnostic Investigations & Imaging
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-mono leading-relaxed">
              {clinicalInfo.investigations}
            </div>
          </div>

          {/* Section: Current Care */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current In-Hospital Care & Medication
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {clinicalInfo.currentCare}
            </p>
          </div>
        </div>

        {/* Side Column (4 cols): Completeness, Missing Info & Provenance */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Data Completeness */}
          <div className="clinical-card p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Data Completeness
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isComplete
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {isComplete ? "Verified Complete" : "Gate Engaged"}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {clinicalInfo.dataCompleteness}%
              </span>
              <span className="text-xs text-slate-500">of required fields</span>
            </div>

            {/* Clean Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isComplete ? "bg-emerald-500" : "bg-red-500"
                }`}
                style={{ width: `${clinicalInfo.dataCompleteness}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 leading-snug pt-1">
              Minimum completeness threshold for automated MCDM calculation is 90%.
            </p>
          </div>

          {/* Card 2: Missing Information */}
          <div className="clinical-card p-5 bg-white space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Missing Information</span>
            </div>

            {clinicalInfo.missingInformation && clinicalInfo.missingInformation.length > 0 ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-800 space-y-1.5">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-600" />
                    <span>Uncertain / Missing Parameters</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800">
                    {clinicalInfo.missingInformation.map((info, idx) => (
                      <li key={idx}>{info}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Missing values default to conservative estimates under the decision matrix.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  All baseline clinical parameters supplied and validated.
                </span>
              </div>
            )}
          </div>

          {/* Card 3: Source / Provenance */}
          <div className="clinical-card p-5 bg-white space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Source & Provenance</span>
            </div>

            <div className="space-y-2">
              {Object.entries(clinicalInfo.dataProvenance || {}).map(
                ([sourceName, location], idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs flex flex-col gap-0.5"
                  >
                    <span className="font-semibold text-slate-800">
                      {sourceName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {location}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Audit verified with hospital EHR integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
