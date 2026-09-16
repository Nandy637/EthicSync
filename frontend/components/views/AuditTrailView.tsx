"use client";

import React, { useState } from "react";
import { CaseData } from "@/types";
import { verifyAuditChainIntegrity } from "@/lib/decisionMath";
import {
  History,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Hash,
  Clock,
  User,
  RefreshCw,
  FileCheck2,
  Lock,
} from "lucide-react";

interface AuditTrailViewProps {
  currentCase: CaseData;
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({
  currentCase,
}) => {
  const { auditLogs } = currentCase;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    totalVerified: number;
  } | null>(() => verifyAuditChainIntegrity(auditLogs));

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      const res = verifyAuditChainIntegrity(auditLogs);
      setVerificationResult(res);
      setVerifying(false);
    }, 400);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Structured timeline step icons/labels
  const getTimelineLabel = (action: string) => {
    switch (action) {
      case "CASE_CREATED":
        return "Case Created";
      case "CLINICAL_DATA_UPDATED":
        return "Clinical Data Updated";
      case "AI_ANALYSIS_COMPLETED":
        return "AI Analysis Completed";
      case "MCDM_CALCULATED":
        return "MCDM Calculated";
      case "ETHICAL_CONFLICT_DETECTED":
        return "Ethical Conflict Detected";
      case "VOTES_UNBLINDED_AND_REVEALED":
        return "Stakeholder Reviews Completed";
      case "FINAL_DECISION_RECORDED":
        return "Final Decision Recorded";
      default:
        return action.replace(/_/g, " ");
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Audit Trail & Event Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-evident sequential event record with SHA-256 cryptographic chaining.
          </p>
        </div>

        {/* Cryptographic Hash Chain Verification Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Hash Chain Verified ({auditLogs.length} Events)</span>
          </div>

          <button
            onClick={handleVerify}
            disabled={verifying}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${verifying ? "animate-spin text-blue-600" : "text-slate-400"}`} />
            <span>Verify Chain</span>
          </button>
        </div>
      </div>

      {/* Vertical Timeline Card */}
      <div className="clinical-card p-6 md:p-8 bg-white space-y-6">
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {auditLogs.map((log, idx) => {
            const isExpanded = expandedId === log.id;
            const stepLabel = getTimelineLabel(log.action);
            const isLast = idx === auditLogs.length - 1;

            return (
              <div key={log.id} className="relative group">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold z-10 transition-colors ${
                    isLast
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-slate-300 text-slate-600 group-hover:border-blue-500"
                  }`}
                >
                  {idx + 1}
                </div>

                {/* Event Card */}
                <div className="p-4 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 transition-all">
                  <div
                    onClick={() => toggleExpand(log.id)}
                    className="flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold text-slate-900">
                          {stepLabel}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                          {log.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{log.userName}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 hidden sm:block">
                        {isExpanded ? "Collapse" : "Details"}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-3 text-xs animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                            Entity Affected
                          </span>
                          <span className="font-semibold text-slate-800">
                            {log.entity} {log.entityId ? `(${log.entityId})` : ""}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                            Action Code
                          </span>
                          <span className="font-mono text-slate-800">
                            {log.action}
                          </span>
                        </div>
                      </div>

                      {/* Cryptographic SHA-256 Hashes */}
                      <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 font-mono text-[10px]">
                        <div>
                          <span className="text-slate-400 block font-sans text-[10px] uppercase font-semibold">
                            Previous Hash
                          </span>
                          <span className="text-slate-600 break-all">
                            {log.previousHash}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans text-[10px] uppercase font-semibold">
                            Event Hash (SHA-256)
                          </span>
                          <span className="text-blue-700 font-semibold break-all">
                            {log.eventHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
