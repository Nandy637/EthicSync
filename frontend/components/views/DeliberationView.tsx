"use client";

import React, { useState } from "react";
import { CaseData, UserRole } from "@/types";
import {
  Vote,
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
} from "lucide-react";

interface DeliberationViewProps {
  currentCase: CaseData;
  currentRole: UserRole;
}

export const DeliberationView: React.FC<DeliberationViewProps> = ({
  currentCase,
  currentRole,
}) => {
  const { options, opinions, votingSession, consensus } = currentCase;

  // Local voting state simulation for interactivity
  const [sessionState, setSessionState] = useState(votingSession.state);
  const [userVoteOptionId, setUserVoteOptionId] = useState(options[0]?.id || "");
  const [userReasoning, setUserReasoning] = useState("");
  const [submittedLocal, setSubmittedLocal] = useState(false);

  const isRevealed =
    sessionState === "REVEALED" ||
    sessionState === "DISCUSSION" ||
    sessionState === "RESOLUTION";

  const handleReveal = () => {
    setSessionState("REVEALED");
  };

  const handleSubmitVote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedLocal(true);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "CONSENSUS_REACHED":
        return "bg-emerald-950/80 border-emerald-700 text-emerald-300";
      case "SPLIT_DECISION":
        return "bg-amber-950/80 border-amber-700 text-amber-300";
      case "SEVERE_DISAGREEMENT":
        return "bg-rose-950/80 border-rose-700 text-rose-300";
      default:
        return "bg-slate-800 text-slate-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Vote className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-semibold text-white tracking-tight">
              Blind Stakeholder Deliberation Chamber
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Opinions are submitted independently and concealed until all
            designated stakeholders have voted to eliminate cognitive anchoring.
          </p>
        </div>

        {/* Voting State Machine Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            State Machine:
          </span>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-300">
            {sessionState}
          </span>
        </div>
      </div>

      {/* Consensus Metrics Summary Card (Shown when votes are revealed) */}
      {isRevealed && consensus && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Consensus Analytics
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(
                    consensus.status
                  )}`}
                >
                  {consensus.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculated dynamically from verified blind submissions.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">
                  Plurality Support
                </span>
                <span className="text-xl font-bold text-sky-300">
                  {consensus.pluralitySupportPercentage}%
                </span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-400 block text-[10px]">
                  Vote Ratio
                </span>
                <span className="text-sm font-bold text-slate-200">
                  {consensus.agreeCount} Agree / {consensus.disagreeCount} Dissent
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider block mb-1">
              Primary Disagreement Driver
            </span>
            <p className="text-slate-200 italic">
              "{consensus.mainDisagreementDriver}"
            </p>
          </div>
        </div>
      )}

      {/* Blind State / Reveal Chamber */}
      {!isRevealed ? (
        <div className="glass-card rounded-2xl p-8 border border-slate-800 text-center space-y-4 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Lock className="w-7 h-7" />
          </div>

          <div className="max-w-md space-y-1">
            <h3 className="text-base font-semibold text-white">
              Ballots Sealed Under Cryptographic Hold
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stakeholders are actively submitting independent reviews. Submissions
              are hidden until deliberation lock is declared.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleReveal}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unblind Ballots & Reveal Consensus (Demo Override)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Revealed Stakeholder Opinions Grid */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              <span>Revealed Multidisciplinary Submissions ({opinions.length})</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Unblinded Simultaneously
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opinions.map((op) => {
              const prefOpt = options.find((o) => o.id === op.preferredOptionId);
              return (
                <div
                  key={op.id}
                  className="glass-card rounded-xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-100">
                          {op.stakeholderName}
                        </h4>
                        <span className="text-[11px] text-sky-400 font-medium">
                          {op.role}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-sky-950/80 border border-sky-800 text-sky-300">
                        Voted: Option {prefOpt?.optionCode || "B"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                      "{op.reasoning}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(op.submittedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-emerald-400">Recorded In Ledger</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Role-Based Vote Submission Form */}
      <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Cast Your Blind Review ({currentRole})</span>
          </h3>
          {submittedLocal && (
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Ballot Encrypted & Saved</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSubmitVote} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt) => (
              <label
                key={opt.id}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2.5 ${
                  userVoteOptionId === opt.id
                    ? "bg-sky-500/15 border-sky-500/50 text-sky-200"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <input
                  type="radio"
                  name="optionSelect"
                  value={opt.id}
                  checked={userVoteOptionId === opt.id}
                  onChange={() => setUserVoteOptionId(opt.id)}
                  className="accent-sky-400"
                />
                <span className="font-semibold">Option {opt.optionCode}:</span>
                <span className="truncate">{opt.optionName}</span>
              </label>
            ))}
          </div>

          <div>
            <textarea
              value={userReasoning}
              onChange={(e) => setUserReasoning(e.target.value)}
              placeholder="Enter your independent clinical reasoning, risk concerns, or values justification..."
              rows={3}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-sky-500/50 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Blind Ballot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
