"use client";

import React, { useState } from "react";
import { CaseData, UserRole } from "@/types";
import { MOCK_CASES } from "@/lib/mockData";
import {
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Clock,
  User,
  CheckCircle2,
  FolderKanban,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { NavTabId } from "../layout/CaseContextBar";

interface CasesListViewProps {
  filterMode?: "all" | "my";
  onSelectCase: (caseId: string, initialTab?: NavTabId) => void;
  currentRole: UserRole;
}

export const CasesListView: React.FC<CasesListViewProps> = ({
  filterMode = "all",
  onSelectCase,
  currentRole,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("ALL");

  const filteredCases = MOCK_CASES.filter((c) => {
    if (filterMode === "my" && c.id === "CASE-005") return false; // simulated filter
    if (urgencyFilter !== "ALL" && c.safetyUrgency !== urgencyFilter) return false;
    if (
      searchTerm &&
      !c.condition.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "CRITICAL":
      case "HIGH":
        return "bg-red-50 text-red-700 border-red-200";
      case "MODERATE":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DECIDED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "HUMAN_REVIEW":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "DELIBERATION":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {filterMode === "my" ? "My Clinical Cases" : "All Clinical Cases"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse and manage active clinical decision workflows and consensus consultations.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="bg-white text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="ALL">All Urgencies</option>
            <option value="HIGH">High Urgency</option>
            <option value="MODERATE">Moderate Urgency</option>
            <option value="LOW">Low Urgency</option>
          </select>
        </div>
      </div>

      {/* Case List Table */}
      <div className="clinical-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-5">Case ID</th>
                <th className="py-3 px-4">Condition & Patient</th>
                <th className="py-3 px-4">Urgency</th>
                <th className="py-3 px-4">Workflow Status</th>
                <th className="py-3 px-4">Ethical Conflict</th>
                <th className="py-3 px-4">Stakeholders</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onSelectCase(c.id, "overview")}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-5 font-mono font-semibold text-slate-900 group-hover:text-blue-600">
                    {c.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{c.condition}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {c.patient.age} yrs • {c.patient.gender} • {c.patient.patientCode}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getUrgencyBadge(
                        c.safetyUrgency
                      )}`}
                    >
                      {c.safetyUrgency}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusBadge(
                        c.status
                      )}`}
                    >
                      {c.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {c.conflicts.length > 0 ? (
                      <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {c.conflicts[0].conflictType.replace(/_/g, " ")}
                      </span>
                    ) : (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        None detected
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {c.opinions.length} reviews
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(c.id, "overview");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Open Case</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
