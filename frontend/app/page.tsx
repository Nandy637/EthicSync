"use client";

import React, { useState, useMemo } from "react";
import { UserRole } from "@/types";
import { MOCK_CASES } from "@/lib/mockData";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar, WorkspaceTab } from "@/components/layout/Sidebar";
import { OverviewView } from "@/components/views/OverviewView";
import { ClinicalDataView } from "@/components/views/ClinicalDataView";
import { AIInsightsView } from "@/components/views/AIInsightsView";
import { MCDMView } from "@/components/views/MCDMView";
import { RadarView } from "@/components/views/RadarView";
import { SensitivityView } from "@/components/views/SensitivityView";
import { StabilityView } from "@/components/views/StabilityView";
import { GovernanceView } from "@/components/views/GovernanceView";
import { DeliberationView } from "@/components/views/DeliberationView";
import { HumanDecisionView } from "@/components/views/HumanDecisionView";
import { AuditTrailView } from "@/components/views/AuditTrailView";
import { ReportView } from "@/components/views/ReportView";

export default function EthicSyncApp() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("CASE-002");
  const [currentRole, setCurrentRole] = useState<UserRole>("Treating Doctor");
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");

  // Lookup active case
  const currentCase = useMemo(() => {
    return (
      MOCK_CASES.find((c) => c.id === selectedCaseId) || MOCK_CASES[0]
    );
  }, [selectedCaseId]);

  const activeSafetyEventsCount = currentCase.safetyEvents.filter(
    (e) => e.status === "ACTIVE"
  ).length;

  const conflictsCount = currentCase.conflicts.length;

  const isDeliberationLocked =
    currentCase.votingSession.state === "LOCKED" ||
    currentCase.votingSession.state === "REVEALED" ||
    currentCase.votingSession.state === "RESOLUTION";

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        selectedCaseId={selectedCaseId}
        onCaseChange={(caseId) => {
          setSelectedCaseId(caseId);
          setActiveTab("overview");
        }}
        caseCount={MOCK_CASES.length}
        activeSafetyEventsCount={activeSafetyEventsCount}
        isAuditChainValid={true}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentRole={currentRole}
          conflictsCount={conflictsCount}
          safetyEventsCount={activeSafetyEventsCount}
          isDeliberationLocked={isDeliberationLocked}
        />

        {/* Dynamic Center View Container */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-[calc(100vh-65px)]">
          {activeTab === "overview" && (
            <OverviewView
              currentCase={currentCase}
              onNavigateTab={setActiveTab}
              currentRole={currentRole}
            />
          )}

          {activeTab === "clinical" && (
            <ClinicalDataView currentCase={currentCase} />
          )}

          {activeTab === "ai-insights" && (
            <AIInsightsView currentCase={currentCase} />
          )}

          {activeTab === "mcdm" && (
            <MCDMView currentCase={currentCase} />
          )}

          {activeTab === "radar" && (
            <RadarView currentCase={currentCase} />
          )}

          {activeTab === "sensitivity" && (
            <SensitivityView currentCase={currentCase} />
          )}

          {activeTab === "stability" && (
            <StabilityView currentCase={currentCase} />
          )}

          {activeTab === "governance" && (
            <GovernanceView currentCase={currentCase} />
          )}

          {activeTab === "deliberation" && (
            <DeliberationView
              currentCase={currentCase}
              currentRole={currentRole}
            />
          )}

          {activeTab === "decision" && (
            <HumanDecisionView
              currentCase={currentCase}
              currentRole={currentRole}
            />
          )}

          {activeTab === "audit" && (
            <AuditTrailView currentCase={currentCase} />
          )}

          {activeTab === "report" && (
            <ReportView currentCase={currentCase} />
          )}
        </main>
      </div>
    </div>
  );
}
