"use client";

import React from "react";
import { CaseData } from "@/types";
import {
  BrainCircuit,
  BookOpen,
  Scale,
  ShieldCheck,
  ExternalLink,
  Cpu,
  Hash,
} from "lucide-react";
import { truncateHash } from "@/lib/utils";

interface AIInsightsViewProps {
  currentCase: CaseData;
}

export const AIInsightsView: React.FC<AIInsightsViewProps> = ({
  currentCase,
}) => {
  const { aiAnalysis } = currentCase;

  return (
    <div className="space-y-6">
      {/* AI Boundary & Philosophy Disclaimer */}
      <div className="glass-card rounded-2xl p-4 border border-indigo-900/60 bg-indigo-950/20 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-400 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-indigo-200">
            AI-Supported Clinical Interpretation — Explanatory Only
          </h3>
          <p className="text-xs text-indigo-300/80 mt-1 leading-relaxed">
            The AI subsystem functions strictly as an evidence extraction and
            explainability layer. It identifies clinical factors, retrieves
            grounded guidelines via vector RAG, and flags candidate ethical
            tensions. **It does not prescribe treatment, nor does it select the
            winning clinical option.**
          </p>
        </div>
      </div>

      {/* Pipeline A: Summary & Extracted Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-sky-400" />
            <span>Executive Clinical Synthesis</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {aiAnalysis.summary}
          </p>

          <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              Extracted Clinical Decision Drivers
            </span>
            <ul className="space-y-1 pl-1">
              {aiAnalysis.clinicalFactors.map((factor, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="text-sky-400 mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Candidate Ethical Issues */}
        <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Candidate Ethical Tensions Detected</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tensions surfaced for review by the multidisciplinary committee:
          </p>
          <div className="space-y-2">
            {aiAnalysis.candidateEthicalIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200"
              >
                {issue}
              </div>
            ))}
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">
              Qualitative Trade-off Overview
            </span>
            <p className="text-xs text-slate-300 italic">
              "{aiAnalysis.tradeOffExplanation}"
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline B: Grounded Knowledge Base (RAG Citations) */}
      <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Grounded Clinical Evidence Citations (pgvector RAG)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {aiAnalysis.retrievedSources.length} Verified Sources Retrieved
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiAnalysis.retrievedSources.map((source) => (
            <div
              key={source.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    {source.id}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {source.source} ({source.version})
                  </span>
                </div>
                <h4 className="font-semibold text-slate-100 text-sm">
                  {source.title}
                </h4>
                <span className="text-[11px] text-sky-300/80 block mt-0.5">
                  Section: {source.section}
                </span>
                <p className="text-xs text-slate-300 mt-2 italic bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                  "{source.snippet}"
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-end text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-sky-400 hover:underline cursor-pointer">
                  <span>View Full Guideline</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Provenance & Reproducibility Metadata */}
      <div className="glass-card rounded-xl p-4 border border-slate-800 text-[11px] text-slate-400 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>{aiAnalysis.modelName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hash className="w-3.5 h-3.5 text-indigo-400" />
          <span>Prompt: {aiAnalysis.promptVersion}</span>
        </div>
        <div>
          <span>Input: {truncateHash(aiAnalysis.inputHash)}</span>
        </div>
        <div>
          <span>Output: {truncateHash(aiAnalysis.outputHash)}</span>
        </div>
      </div>
    </div>
  );
};
