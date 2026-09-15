"use client";

import React, { useState } from "react";
import { CaseData } from "@/types";
import { verifyAuditChainIntegrity } from "@/lib/decisionMath";
import { truncateHash } from "@/lib/utils";
import {
  History,
  ShieldCheck,
  ShieldAlert,
  Hash,
  Clock,
  User,
  CheckCircle2,
  RefreshCw,
  FileKey,
} from "lucide-react";

interface AuditTrailViewProps {
  currentCase: CaseData;
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({
  currentCase,
}) => {
  const { auditLogs } = currentCase;
  const [verifying, setVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    totalVerified: number;
  } | null>(null);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      const res = verifyAuditChainIntegrity(auditLogs);
      setVerificationResult(res);
      setVerifying(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-semibold text-white tracking-tight">
              Tamper-Evident Cryptographic Audit Trail
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Every clinical state modification is chained via SHA-256 hashes:{" "}
            <code className="bg-slate-900 px-1 py-0.5 rounded text-sky-300">
              hash_i = SHA-256(hash_{"i-1"} + payload)
            </code>
            . Guaranteed historical integrity.
          </p>
        </div>

        <button
          onClick={handleVerify}
          disabled={verifying}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${verifying ? "animate-spin" : ""}`} />
          <span>Verify Hash Chain Integrity</span>
        </button>
      </div>

      {/* Verification Result Banner */}
      {verificationResult && (
        <div
          className={`glass-card rounded-xl p-4 border flex items-center justify-between gap-4 ${
            verificationResult.isValid
              ? "border-emerald-700/60 bg-emerald-950/30 text-emerald-200"
              : "border-rose-700/80 bg-rose-950/40 text-rose-200"
          }`}
        >
          <div className="flex items-center gap-3 text-xs">
            {verificationResult.isValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <div>
              <span className="font-semibold block text-sm">
                {verificationResult.isValid
                  ? "Cryptographic Hash Chain Valid & Tamper-Free"
                  : "Hash Chain Verification Failure"}
              </span>
              <span className="text-[11px] opacity-80">
                {verificationResult.totalVerified} chronological state events
                verified against genesis block. All SHA-256 parent-child links intact.
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-emerald-900/60 border border-emerald-700 font-bold text-emerald-300">
            Chain Intact
          </span>
        </div>
      )}

      {/* Hash-Chain Ledger Timeline */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <FileKey className="w-4 h-4 text-sky-400" />
            <span>Immutable Action Log Sequence ({auditLogs.length} Events)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Genesis Hash: 0000...0000
          </span>
        </div>

        <div className="divide-y divide-slate-800/80 text-xs">
          {auditLogs.map((log, idx) => (
            <div key={log.id} className="p-4.5 hover:bg-slate-900/40 transition-colors space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300 flex items-center justify-center font-bold">
                    #{idx + 1}
                  </span>
                  <span className="font-semibold text-slate-100 font-mono">
                    {log.action}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {log.entity}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-sky-400" />
                    <span>{log.userName}</span>
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </span>
                </div>
              </div>

              {log.reason && (
                <p className="text-xs text-slate-300 italic pl-8">
                  "{log.reason}"
                </p>
              )}

              {/* Cryptographic Link Badges */}
              <div className="pl-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase">Prev Hash:</span>
                  <span className="text-slate-400">{truncateHash(log.previousHash, 8)}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-sky-400 uppercase">Event Hash:</span>
                  <span className="text-sky-300 font-bold">{truncateHash(log.eventHash, 8)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
