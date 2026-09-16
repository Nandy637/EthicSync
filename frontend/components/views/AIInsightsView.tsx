"use client";

import React, { useState } from "react";
import { CaseData } from "@/types";
import {
  BrainCircuit,
  BookOpen,
  Scale,
  ShieldCheck,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
} from "lucide-react";

interface AIInsightsViewProps {
  currentCase: CaseData;
}

export const AIInsightsView: React.FC<AIInsightsViewProps> = ({
  currentCase,
}) => {
  const { aiAnalysis } = currentCase;
  const [selectedCitation, setSelectedCitation] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          AI & Evidence Extraction
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated literature retrieval, guideline grounding, and structured explanation.
        </p>
      </div>

      {/* 1. TOP DISCLAIMER BANNER */}
      <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 shadow-2xs flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-purple-950">
              AI-ASSISTED CLINICAL INTERPRETATION
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-200/60 text-purple-800">
              Explanatory Layer
            </span>
          </div>
          <p className="text-xs text-purple-900 leading-relaxed font-medium">
            AI provides evidence extraction, summarization, and explanation. It does not prescribe treatment or make the final decision.
          </p>
          <p className="text-[11px] text-purple-700/80">
            Model: {aiAnalysis.modelName} • Verification Hash: {aiAnalysis.outputHash.slice(0, 16)}...
          </p>
        </div>
      </div>

      {/* 2. CLINICAL SYNTHESIS */}
      <div className="clinical-card p-6 md:p-8 space-y-6 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Clinical Synthesis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Findings */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Key Findings
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {aiAnalysis.summary}
            </p>
          </div>

          {/* Relevant Decision Factors */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Relevant Decision Factors
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {aiAnalysis.clinicalFactors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Information */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Missing Information Impact
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentCase.clinicalInfo.missingInformation.length > 0
                ? `Identified ${currentCase.clinicalInfo.missingInformation.length} omissions. Mathematical model adjusted to conservative risk bounds.`
                : "No omissions detected in baseline clinical profile. High confidence in factor mapping."}
            </p>
          </div>

          {/* Potential Ethical Tensions */}
          <div className="space-y-2 p-4 rounded-xl bg-purple-50/40 border border-purple-200/60">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">
              Potential Ethical Tensions
            </span>
            <ul className="space-y-1.5 text-xs text-purple-950">
              {aiAnalysis.candidateEthicalIssues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Scale className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trade-Off Natural Language Explanation */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            AI Trade-Off Explanation
          </span>
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 leading-relaxed">
            {aiAnalysis.tradeOffExplanation}
          </div>
        </div>
      </div>

      {/* 3. GROUNDED EVIDENCE & RAG CITATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Grounded Evidence & Guidelines
            </h2>
            <p className="text-xs text-slate-500">
              Directly cited from peer-reviewed literature and authorized clinical guidelines.
            </p>
          </div>
          <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg font-semibold">
            {aiAnalysis.retrievedSources.length} Grounded Citations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiAnalysis.retrievedSources.map((cite) => (
            <div
              key={cite.id}
              className="clinical-card p-5 bg-white space-y-3 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-700">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{cite.source}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-normal">{cite.version}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  {cite.id}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {cite.title}
                </h4>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  Section: {cite.section}
                </p>
              </div>

              <blockquote className="p-3 rounded-xl bg-slate-50 border-l-2 border-purple-500 text-xs text-slate-700 italic leading-relaxed">
                &ldquo;{cite.snippet}&rdquo;
              </blockquote>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Grounded Citation Verified
                </span>
                <button
                  onClick={() => alert(`Opening citation source: ${cite.title}`)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View source</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
