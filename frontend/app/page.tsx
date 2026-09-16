"use client";

import React, { useState, useMemo } from "react";
import { UserRole } from "@/types";
import { MOCK_CASES } from "@/lib/mockData";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { CaseContextBar, NavTabId } from "@/components/layout/CaseContextBar";
import { HomeDashboardView } from "@/components/views/HomeDashboardView";
import { CasesListView } from "@/components/views/CasesListView";
import { OverviewView } from "@/components/views/OverviewView";
import { ClinicalDataView } from "@/components/views/ClinicalDataView";
import { AIInsightsView } from "@/components/views/AIInsightsView";
import { DecisionAnalysisView } from "@/components/views/DecisionAnalysisView";
import { GovernanceView } from "@/components/views/GovernanceView";
import { HumanDecisionView } from "@/components/views/HumanDecisionView";
import { AuditTrailView } from "@/components/views/AuditTrailView";
import { ReportView } from "@/components/views/ReportView";
import { SettingsView } from "@/components/views/SettingsView";
import { HelpCircle, X, CheckCircle2 } from "lucide-react";

export default function EthicSyncApp() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("CASE-002");
  const [currentRole, setCurrentRole] = useState<UserRole>("Treating Doctor");
  const [activeTab, setActiveTab] = useState<NavTabId>("home");
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Active Case Lookup
  const currentCase = useMemo(() => {
    return (
      MOCK_CASES.find((c) => c.id === selectedCaseId) || MOCK_CASES[0]
    );
  }, [selectedCaseId]);

  const activeSafetyEventsCount = currentCase.safetyEvents.filter(
    (e) => e.status === "ACTIVE"
  ).length;

  const conflictsCount = currentCase.conflicts.length;

  const isCaseWorkflowTab = [
    "overview",
    "clinical",
    "ai-insights",
    "decision-analysis",
    "governance",
    "final-decision",
    "audit-report",
  ].includes(activeTab);

  const handleSelectCase = (caseId: string, initialTab: NavTabId = "overview") => {
    setSelectedCaseId(caseId);
    setActiveTab(initialTab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Global Header */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        selectedCaseId={selectedCaseId}
        onCaseChange={handleSelectCase}
      />

      {/* 2. Compact Case Context Bar (Rendered when viewing a case) */}
      {isCaseWorkflowTab && (
        <CaseContextBar
          currentCase={currentCase}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCaseChange={handleSelectCase}
          onBackToHome={() => setActiveTab("home")}
        />
      )}

      {/* 3. Main Workspace Shell */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentRole={currentRole}
          conflictsCount={conflictsCount}
          safetyEventsCount={activeSafetyEventsCount}
          hasSelectedCase={true}
          onOpenSupportModal={() => setSupportModalOpen(true)}
        />

        {/* Dynamic Center View Container */}
        <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-65px)]">
          {/* HOME DASHBOARD */}
          {activeTab === "home" && (
            <HomeDashboardView
              currentRole={currentRole}
              onSelectCase={handleSelectCase}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* ALL CASES */}
          {activeTab === "cases-all" && (
            <CasesListView
              filterMode="all"
              onSelectCase={handleSelectCase}
              currentRole={currentRole}
            />
          )}

          {/* MY CASES */}
          {activeTab === "cases-my" && (
            <CasesListView
              filterMode="my"
              onSelectCase={handleSelectCase}
              currentRole={currentRole}
            />
          )}

          {/* CURRENT CASE: OVERVIEW */}
          {activeTab === "overview" && (
            <OverviewView
              currentCase={currentCase}
              onNavigateTab={setActiveTab}
              currentRole={currentRole}
            />
          )}

          {/* CURRENT CASE: CLINICAL DATA */}
          {activeTab === "clinical" && (
            <ClinicalDataView currentCase={currentCase} />
          )}

          {/* CURRENT CASE: AI & EVIDENCE */}
          {activeTab === "ai-insights" && (
            <AIInsightsView currentCase={currentCase} />
          )}

          {/* CURRENT CASE: DECISION ANALYSIS (MCDM, Trade-Off Radar, Sensitivity, Robustness) */}
          {activeTab === "decision-analysis" && (
            <DecisionAnalysisView currentCase={currentCase} />
          )}

          {/* CURRENT CASE: GOVERNANCE (Ethics, Stakeholders, Consensus) */}
          {activeTab === "governance" && (
            <GovernanceView
              currentCase={currentCase}
              currentRole={currentRole}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* CURRENT CASE: FINAL HUMAN DECISION */}
          {activeTab === "final-decision" && (
            <HumanDecisionView
              currentCase={currentCase}
              currentRole={currentRole}
            />
          )}

          {/* CURRENT CASE: AUDIT & REPORT */}
          {activeTab === "audit-report" && (
            <div className="space-y-8">
              <AuditTrailView currentCase={currentCase} />
              <div className="pt-6 border-t border-slate-200">
                <ReportView currentCase={currentCase} />
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <SettingsView currentRole={currentRole} />
          )}
        </main>
      </div>

      {/* Clinical Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  EthicSync Clinical Support
                </h3>
              </div>
              <button
                onClick={() => setSupportModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              EthicSync provides verifiable clinical decision support for high-stakes healthcare scenarios. If you experience technical delays or require ethics committee intervention, contact the hospital board dispatch.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-semibold text-slate-800">
                Clinical Ethics Hotline: <span className="font-mono text-blue-600">ext. 4402</span>
              </div>
              <div className="text-slate-500">
                On-call Ethics Officer: Dr. Arthur Pendelton
              </div>
            </div>

            <button
              onClick={() => setSupportModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
