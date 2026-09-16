"use client";

import React, { useState } from "react";
import { CaseData, UserRole } from "@/types";
import {
  FolderKanban,
  Clock,
  AlertTriangle,
  Users,
  PlusCircle,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Sparkles,
  ShieldAlert,
  FileText,
  CheckCircle2,
  Calendar,
  MoreVertical,
  Leaf,
  Check,
} from "lucide-react";
import { MOCK_CASES } from "@/lib/mockData";
import { NavTabId } from "../layout/CaseContextBar";

interface HomeDashboardViewProps {
  currentRole: UserRole;
  onSelectCase: (caseId: string, initialTab?: NavTabId) => void;
  onNavigateTab: (tab: NavTabId) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  currentRole,
  onSelectCase,
  onNavigateTab,
}) => {
  const [insightIndex, setInsightIndex] = useState(0);

  const insights = [
    {
      title: "Ethical conflicts arise in 38% of high-urgency cases.",
      description:
        "Most common: urgency vs long-term benefit. Early multidisciplinary review improves decision stability.",
    },
    {
      title: "Consensus threshold reached faster with blind reviews.",
      description:
        "Concealing peer opinions until submission reduces cognitive anchoring by 42% in borderline cases.",
    },
    {
      title: "Robustness simulation flags sensitive weight changes.",
      description:
        "Cases with stability margins below 15% prompt automatic clinical safety reviews before finalization.",
    },
  ];

  const recentCases = [
    {
      id: "CASE-002",
      condition: "Acute Coronary Syndrome",
      urgency: "High",
      urgencyClass: "bg-red-50 text-red-700 border-red-200",
      status: "Deliberation",
      statusClass: "bg-blue-50 text-blue-700 border-blue-200",
      updated: "2h ago",
    },
    {
      id: "CASE-001",
      condition: "Stable Coronary Artery Disease",
      urgency: "Low",
      urgencyClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      status: "Decided",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      updated: "5h ago",
    },
    {
      id: "CASE-004",
      condition: "Advanced Lung Cancer (Oncology)",
      urgency: "Medium",
      urgencyClass: "bg-amber-50 text-amber-700 border-amber-200",
      status: "Stakeholder Review",
      statusClass: "bg-purple-50 text-purple-700 border-purple-200",
      updated: "1d ago",
    },
    {
      id: "CASE-003",
      condition: "Abdominal Aortic Aneurysm",
      urgency: "High",
      urgencyClass: "bg-red-50 text-red-700 border-red-200",
      status: "Human Review",
      statusClass: "bg-amber-50 text-amber-700 border-amber-200",
      updated: "1d ago",
    },
    {
      id: "CASE-005",
      condition: "Sepsis (ICU Missing Data)",
      urgency: "High",
      urgencyClass: "bg-red-50 text-red-700 border-red-200",
      status: "Analysis Complete",
      statusClass: "bg-blue-50 text-blue-700 border-blue-200",
      updated: "2d ago",
    },
  ];

  const systemAlerts = [
    {
      id: "a1",
      icon: AlertTriangle,
      color: "text-red-500 bg-red-50",
      text: "CASE-002 marked as high urgency",
      time: "1h ago",
      caseId: "CASE-002",
    },
    {
      id: "a2",
      icon: Clock,
      color: "text-amber-500 bg-amber-50",
      text: "New stakeholder opinion submitted — CASE-001",
      time: "3h ago",
      caseId: "CASE-001",
    },
    {
      id: "a3",
      icon: Sparkles,
      color: "text-blue-500 bg-blue-50",
      text: "AI analysis completed — CASE-005",
      time: "5h ago",
      caseId: "CASE-005",
    },
    {
      id: "a4",
      icon: Users,
      color: "text-purple-500 bg-purple-50",
      text: "Discussion requested — CASE-003",
      time: "1d ago",
      caseId: "CASE-003",
    },
  ];

  const caseInFocus = MOCK_CASES.find((c) => c.id === "CASE-002") || MOCK_CASES[0];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Good morning, Dr. Priya 👋
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Make ethically sound, evidence-based decisions — together.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs italic text-slate-400 font-serif">
            &ldquo;Better decisions. Fairer care.&rdquo;
          </p>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Active Cases */}
        <div className="clinical-card p-4 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <FolderKanban className="w-4 h-4 text-blue-600" />
            <span>Active Cases</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <span>↗</span> +2 this week
            </div>
          </div>
        </div>

        {/* Card 2: Pending Reviews */}
        <div className="clinical-card p-4 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Pending Reviews</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">5</div>
            <div className="text-[11px] text-amber-600 font-medium mt-0.5">
              Awaiting action
            </div>
          </div>
        </div>

        {/* Card 3: Urgent Cases */}
        <div className="clinical-card p-4 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Urgent Cases</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">3</div>
            <div className="text-[11px] text-red-600 font-medium mt-0.5">
              Require immediate review
            </div>
          </div>
        </div>

        {/* Card 4: Consensus Reached */}
        <div className="clinical-card p-4 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Consensus Reached</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">8</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              67% of completed cases
            </div>
          </div>
        </div>

        {/* Card 5: New Case CTA */}
        <div
          onClick={() => onSelectCase("CASE-002", "clinical")}
          className="rounded-2xl p-4 bg-blue-600 hover:bg-blue-700 text-white flex flex-col justify-between shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-blue-100 text-xs font-medium">
            <PlusCircle className="w-4 h-4 text-white" />
            <span className="font-semibold text-white">New Case</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-blue-100 font-medium">
              Start a new clinical case
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Recent Cases + Alerts) & Right (Case in Focus + Insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Recent Cases Card */}
          <div className="clinical-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Recent Cases
              </h2>
              <button
                onClick={() => onNavigateTab("cases-all")}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-2.5 font-medium">Case ID</th>
                    <th className="pb-2.5 font-medium">Condition</th>
                    <th className="pb-2.5 font-medium">Urgency</th>
                    <th className="pb-2.5 font-medium">Status</th>
                    <th className="pb-2.5 font-medium">Updated</th>
                    <th className="pb-2.5 text-right font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentCases.map((rc) => (
                    <tr
                      key={rc.id}
                      onClick={() => onSelectCase(rc.id, "overview")}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 font-mono font-medium text-slate-900 group-hover:text-blue-600">
                        {rc.id}
                      </td>
                      <td className="py-3 text-slate-800 font-medium max-w-[200px] truncate">
                        {rc.condition}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${rc.urgencyClass}`}
                        >
                          {rc.urgency}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${rc.statusClass}`}
                        >
                          {rc.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 text-[11px]">
                        {rc.updated}
                      </td>
                      <td className="py-3 text-right">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Alerts */}
          <div className="clinical-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                System Alerts
              </h2>
              <button
                onClick={() => onNavigateTab("cases-all")}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {systemAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    onClick={() => onSelectCase(alert.caseId, "overview")}
                    className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-1 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${alert.color}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-slate-800 font-medium">
                        {alert.text}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {alert.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Case in Focus Card */}
          <div className="clinical-card p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  Case in Focus
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {caseInFocus.id}
                </span>
              </div>
              <button
                onClick={() => onSelectCase("CASE-002", "overview")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900">
                {caseInFocus.condition}
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 shrink-0">
                High Urgency
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
              <span>{caseInFocus.patient.age} yrs • {caseInFocus.patient.gender}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Sep 12, 2026</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {caseInFocus.description}
            </p>

            {/* Stepper Progress */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 font-medium">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-1.5 flex-1 text-center">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-slate-700 font-semibold text-[10px]">Intake</span>
                </div>
                <div className="h-0.5 flex-1 bg-blue-500 -mt-4" />

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-1.5 flex-1 text-center">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-slate-700 font-semibold text-[10px]">AI Analysis</span>
                </div>
                <div className="h-0.5 flex-1 bg-blue-500 -mt-4" />

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-1.5 flex-1 text-center">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-blue-700 font-semibold text-[10px]">Decision</span>
                </div>
                <div className="h-0.5 flex-1 bg-slate-200 -mt-4" />

                {/* Step 4 */}
                <div className="flex flex-col items-center gap-1.5 flex-1 text-center">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                  <span className="text-slate-400 text-[10px]">Stakeholder</span>
                </div>
                <div className="h-0.5 flex-1 bg-slate-200 -mt-4" />

                {/* Step 5 */}
                <div className="flex flex-col items-center gap-1.5 flex-1 text-center">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                  <span className="text-slate-400 text-[10px]">Final Decision</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ethical Insights Card */}
          <div className="clinical-card p-5 bg-gradient-to-br from-white via-white to-purple-50/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900">
                  Ethical Insights
                </span>
              </div>
              <button
                onClick={() => onNavigateTab("governance")}
                className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="min-h-[70px]">
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                {insights[insightIndex].title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {insights[insightIndex].description}
              </p>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                {insights.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setInsightIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === insightIndex
                        ? "bg-blue-600 w-4"
                        : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setInsightIndex((prev) =>
                      prev === 0 ? insights.length - 1 : prev - 1
                    )
                  }
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setInsightIndex((prev) =>
                      prev === insights.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quote Banner */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-emerald-900">
          <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="italic font-medium">
            &ldquo;Ethics isn&rsquo;t a step in the process. It&rsquo;s the purpose.&rdquo;
          </span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 hidden sm:block">
          EthicSync
        </span>
      </div>
    </div>
  );
};
