export type UserRole =
  | "Patient"
  | "Treating Doctor"
  | "Appointed Doctor"
  | "Medical/Ethics Official"
  | "Admin";

export type CaseStatus =
  | "DRAFT"
  | "INTAKE_COMPLETE"
  | "ANALYSIS_READY"
  | "ANALYSIS_COMPLETE"
  | "DELIBERATION"
  | "HUMAN_REVIEW"
  | "DECIDED"
  | "ARCHIVED";

export type UrgencyLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type CriterionDirection = "MAX" | "MIN";

export type ScoreSource =
  | "DOCTOR_ENTERED"
  | "AI_EXTRACTED"
  | "SYSTEM_CALCULATED"
  | "IMPORTED_RECORD";

export type ConflictType =
  | "urgency_vs_benefit"
  | "benefit_vs_safety"
  | "patient_preference_vs_clinical"
  | "benefit_vs_resources"
  | "stakeholder_disagreement"
  | "recommendation_instability"
  | "fairness_concern";

export type SeverityLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type VotingSessionState =
  | "OPEN"
  | "SUBMISSIONS_IN_PROGRESS"
  | "LOCKED"
  | "REVEALED"
  | "DISCUSSION"
  | "RESOLUTION";

export type ConsensusStatus =
  | "CONSENSUS_REACHED"
  | "SPLIT_DECISION"
  | "SEVERE_DISAGREEMENT";

export type DecisionType = "ACCEPT" | "MODIFY" | "REJECT";

export interface Patient {
  id: string;
  patientCode: string; // Anonymized
  age: number;
  gender: string;
}

export interface ClinicalInformation {
  id: string;
  caseId: string;
  medicalHistory: string;
  currentStatus: string;
  relevantFindings: string;
  investigations: string;
  currentCare: string;
  dataCompleteness: number; // 0 to 100
  missingInformation: string[];
  dataProvenance: Record<string, string>;
}

export interface ClinicalOption {
  id: string;
  caseId: string;
  optionCode: "A" | "B" | "C" | "D";
  optionName: string;
  description: string;
  expectedBenefitRaw: number; // e.g. 8.5
  safetyRaw: number; // e.g. 8.0
  recoveryProbabilityRaw: number; // e.g. 75 (%)
  urgencyAlignmentRaw: UrgencyLevel;
  patientPreferenceRaw: number; // 1 to 10
  riskRaw: number; // e.g. 3.2 (MIN)
  resourceRequirementRaw: "LOW" | "MODERATE" | "HIGH" | "EXTREME"; // (MIN)
}

export interface Criterion {
  id: string;
  caseId: string;
  name: string;
  description: string;
  weight: number; // 0.0 to 1.0, sum of all = 1.0
  direction: CriterionDirection;
  templateOrigin: string;
}

export interface OptionScore {
  id: string;
  caseId: string;
  optionId: string;
  criterionId: string;
  rawValue: string;
  normalizedScore: number; // 0.0 to 1.0
  source: ScoreSource;
  sourceReference?: string;
}

export interface RAGCitation {
  id: string;
  title: string;
  source: string;
  version: string;
  section: string;
  snippet: string;
}

export interface AIAnalysis {
  id: string;
  caseId: string;
  summary: string;
  clinicalFactors: string[];
  candidateEthicalIssues: string[];
  aiInterpretation: string; // Natural language explanation (NOT final decision)
  tradeOffExplanation: string;
  retrievedSources: RAGCitation[];
  modelName: string;
  modelVersion: string;
  promptVersion: string;
  inputHash: string;
  outputHash: string;
  createdAt: string;
}

export interface SafetyEvent {
  id: string;
  caseId: string;
  eventType:
    | "CRITICAL_URGENCY"
    | "MISSING_REQUIRED_DATA"
    | "UNSTABLE_RECOMMENDATION"
    | "ETHICAL_CONFLICT"
    | "DEMOGRAPHIC_SENSITIVITY_FLAG";
  severity: SeverityLevel;
  trigger: string;
  description: string;
  status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
  createdAt: string;
}

export interface EthicalConflict {
  id: string;
  caseId: string;
  conflictType: ConflictType;
  severity: SeverityLevel;
  factorA: string;
  factorB: string;
  description: string;
  resolutionRequired: boolean;
}

export interface StakeholderOpinion {
  id: string;
  caseId: string;
  stakeholderId: string;
  stakeholderName: string;
  role: UserRole;
  preferredOptionId: string;
  reasoning: string;
  concerns?: string;
  submittedAt: string;
}

export interface VotingSession {
  id: string;
  caseId: string;
  state: VotingSessionState;
  openedAt: string;
  lockedAt?: string;
  revealedAt?: string;
}

export interface Consensus {
  id: string;
  caseId: string;
  pluralitySupportPercentage: number;
  pluralityOptionId: string;
  agreeCount: number;
  disagreeCount: number;
  totalVotes: number;
  status: ConsensusStatus;
  mainDisagreementDriver: string;
}

export interface DecisionSnapshot {
  id: string;
  caseId: string;
  mcdmVersion: string;
  criteriaWeights: Record<string, number>;
  mcdmWinnerId: string;
  stabilityIndex: number;
  stabilityMargin: number;
  humanDecisionId: string;
  decisionType: DecisionType;
  overrideJustification?: string;
  reviewerName: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  caseId: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  reason?: string;
  previousHash: string;
  eventHash: string;
  timestamp: string;
}

export interface CaseData {
  id: string;
  patient: Patient;
  condition: string;
  description: string;
  status: CaseStatus;
  safetyUrgency: UrgencyLevel;
  humanReviewRequired: boolean;
  reviewReasons: string[];
  createdAt: string;
  clinicalInfo: ClinicalInformation;
  options: ClinicalOption[];
  criteria: Criterion[];
  scores: OptionScore[];
  aiAnalysis: AIAnalysis;
  safetyEvents: SafetyEvent[];
  conflicts: EthicalConflict[];
  votingSession: VotingSession;
  opinions: StakeholderOpinion[];
  consensus?: Consensus;
  finalDecision?: DecisionSnapshot;
  auditLogs: AuditLog[];
}
