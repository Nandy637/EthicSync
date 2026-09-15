# 🚀 EthicSync: Project Master Plan & Specification
### AI-Assisted Explainable Clinical Decision Support, Ethical Deliberation & Human Governance Platform

> **Core Architectural Tenet:**  
> **AI interprets and explains; deterministic engines score and analyze; safety rules gate decisions; stakeholders deliberate independently; humans retain final authority; and every decision state is auditable.**

---

## 0. Project Identity, Philosophy & Boundary Definitions

EthicSync is **not** an autonomous medical agent:
```text
[REJECTED MODEL]
Patient → AI → Diagnosis → Treatment
```

EthicSync is an **explainable decision-support and ethical governance platform**:
```text
CASE CREATION
      ↓
DATA VALIDATION & PROVENANCE RECORDING
      ↓
DETERMINISTIC MISSING INFORMATION GATE (Checklist + Semantic Extraction)
      ↓
URGENCY SAFETY SCREEN (Immediate Clinical Gate)
      ↓
CLINICAL INFORMATION NORMALIZATION
      ↓
AI CLINICAL UNDERSTANDING (Pipeline A: Summary & Extraction)
      ↓
EVIDENCE & ETHICAL RETRIEVAL (Pipeline B: RAG with Source Governance)
      ↓
AVAILABLE CLINICAL OPTIONS
      ↓
CRITERIA CONFIGURATION TEMPLATES (Physician-Governed Weights)
      ↓
NORMALIZATION LAYER (Raw [Units] → Normalized [0.0 to 1.0], MIN/MAX Aware)
      ↓
MCDM MATHEMATICAL COMPARISON (Deterministic Ranking)
      ↓
TRADE-OFF & RADAR ANALYSIS
      ↓
SENSITIVITY ANALYSIS (Dynamic Weight Stepping & Crossover Detection)
      ↓
DECISION STABILITY SIMULATION (Dirichlet/Controlled Perturbation: Stability Index + Margin)
      ↓
ETHICAL CONFLICT DETECTION (Rule-Based Taxonomy & Severity)
      ↓
FAIRNESS & CRITERION GOVERNANCE SCREENING (Counterfactual Validation)
      ↓
SAFETY EVENTS & RED FLAG GATE (Escalation to Immediate Human Review)
      ↓
INDEPENDENT STAKEHOLDER OPINIONS (Role-Differentiated Access)
      ↓
BLIND DELIBERATION & VOTING (Strict Voting State Machine)
      ↓
VOTE REVEAL & CONSENSUS ANALYSIS (Plurality Support % + Agreement Level)
      ↓
DECISION TRANSPARENCY PORTAL ("WHY?" Traceability & Factor Contribution)
      ↓
HUMAN FINAL CLINICAL DECISION (Accept / Modify / Reject + Mandatory Override Logging)
      ↓
FROZEN DECISION SNAPSHOT (Point-in-Time State Capture)
      ↓
TAMPER-EVIDENT AUDIT TRAIL (Cryptographic Hash-Linked Chain)
      ↓
ETHICAL DECISION REPORT (Verifiable PDF & Markdown Export)
```

### Strict System Boundaries: Who Does What?

| Domain | Subsystem | Responsibilities | Inviolable Constraints |
| :--- | :--- | :--- | :--- |
| **AI (Probabilistic)** | AI Pipeline | • Clinical NLP & structured extraction<br>• Clinical text summarization<br>• RAG semantic retrieval<br>• Candidate ethical issue detection<br>• Natural language rationale & trade-off explanation | • **NEVER** diagnoses or prescribes.<br>• **NEVER** selects clinical option.<br>• **NEVER** produces mathematical scores directly.<br>• **NEVER** claims absolute fairness. |
| **Deterministic (Algorithmic)** | Decision Engine & Safety Engine | • Multi-Criteria Decision Analysis (MCDM)<br>• Sensitivity analysis & crossover identification<br>• Decision Stability Index & runner-up margin<br>• Rule-based ethical conflict detection & severity<br>• Missing data checklists & urgency safety gates<br>• Voting state machine & consensus mathematics<br>• Counterfactual fairness testing | • Completely reproducible given identical inputs.<br>• Weights never silently altered by AI.<br>• Code-level deterministic execution. |
| **Human (Authoritative)** | Clinicians & Stakeholders | • Setting/adjusting criteria weights<br>• Submitting blind opinions & votes<br>• Final clinical decision (Accept / Modify / Reject)<br>• Structured override justification | • Holds sole legal and clinical decision authority.<br>• Override requires documented clinical rationale. |

---

## 1. High-Level System Architecture

```text
                                USERS
       ┌──────────────────────────┼──────────────────────────┐
       ↓                          ↓                          ↓
    Patient                    Doctors                Ethics Official
(Patient View)         (Treating & Appointed)       (Governance View)
       └──────────────────────────┬──────────────────────────┘
                                  ↓
                       ┌─────────────────────┐
                       │   Next.js Frontend  │
                       │ (TypeScript + Zod)  │
                       └──────────┬──────────┘
                                  ↓ REST API (Polling / Invalidation)
                       ┌─────────────────────┐
                       │   FastAPI Backend   │
                       └──────────┬──────────┘
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       ↓                          ↓                          ↓
  AI PIPELINE              DECISION ENGINE             SAFETY ENGINE
(Streamlined Core)       (Deterministic Math)        (Deterministic Gating)
       │                          │                          │
       ├─ Clinical Pipeline A     ├─ Normalization (0-1)     ├─ Clinical Urgency Gate
       │  (Extract, Norm, Sum)    ├─ Weighted MCDM           ├─ Missing Data Checklist
       ├─ Evidence Pipeline B     ├─ Sensitivity & Crossover ├─ Safety Events Logger
       │  (RAG, Ethics Candidate) ├─ Stability (Dirichlet)   └─ Review Reasons Router
       └─ Explanation Pipeline C  ├─ Conflict Rules
          (MCDM & Trade-off Synth)└─ Fairness Screening
       │                          │                          │
       └──────────────────────────┼──────────────────────────┘
                                  ↓
                        PostgreSQL + pgvector
                                  │
          ┌───────────────────────┼───────────────────────┐
          ↓                       ↓                       ↓
     Cases & Records      Decision Snapshots          Audit Logs
                                                          │
                                                          ↓
                                               Tamper-Evident Hash Chain
```

---

## 2. Technology Stack & Component Selection

### Frontend
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS, shadcn/ui
- **Forms & Validation:** React Hook Form + Zod
- **Data Visualization:** Recharts (Radar charts for trade-offs, bar charts for MCDM, line charts for sensitivity crossover, gauge meters for stability)
- **State Management & Network:** TanStack Query (React Query) with optimistic UI updates and cache invalidation over REST (avoiding premature WebSocket complexity).

### Backend
- **Framework:** Python 3.11+, FastAPI
- **Validation & Serialization:** Pydantic v2
- **ORM & Migrations:** SQLAlchemy 2.0, Alembic
- **Mathematical Stack:** NumPy, Pandas, SciPy (Dirichlet sampling, linear normalization)

### Database & Storage
- **Primary Database:** PostgreSQL 16
- **Vector Store:** `pgvector` extension for embeddings
- **Object Storage:** S3-compatible local/cloud storage (e.g. MinIO / Local filesystem for PDF/document uploads with SHA-256 validation)

### AI & Embeddings (Provider-Agnostic Configuration)
Configured via `.env` without vendor lock-in:
```env
LLM_PROVIDER=google          # google | openai | anthropic
LLM_MODEL=gemini-2.5-flash   # Configurable model ID
EMBEDDING_PROVIDER=google    # google | openai | local
EMBEDDING_MODEL=text-embedding-004
```

### Security & Access Control
- **Authentication:** JWT (JSON Web Tokens) with secure HTTP-only cookies and refresh token rotation.
- **Role-Based Access Control (RBAC):**
  1. `Patient`
  2. `Treating Doctor`
  3. `Appointed Doctor` (Independent review)
  4. `Medical/Ethics Official`
  5. `Admin`

---

## 3. Database Schema & Data Models

### 3.1 `users`
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Patient', 'Treating Doctor', 'Appointed Doctor', 'Medical/Ethics Official', 'Admin')),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);
```

### 3.2 `patients`
```sql
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    patient_code VARCHAR(100) UNIQUE NOT NULL, -- Anonymized clinical identifier
    age INT NOT NULL,
    gender VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.3 `cases`
```sql
CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    created_by UUID NOT NULL REFERENCES users(id),
    condition VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT' CHECK (status IN (
        'DRAFT',
        'INTAKE_COMPLETE',
        'ANALYSIS_READY',
        'ANALYSIS_COMPLETE',
        'DELIBERATION',
        'HUMAN_REVIEW',
        'DECIDED',
        'ARCHIVED'
    )),
    safety_urgency VARCHAR(50) NOT NULL CHECK (safety_urgency IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    human_review_required BOOLEAN DEFAULT FALSE,
    review_reasons JSONB DEFAULT '[]'::jsonb, -- e.g. ["CRITICAL_URGENCY", "RECOMMENDATION_INSTABILITY"]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.4 `clinical_information`
```sql
CREATE TABLE clinical_information (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID UNIQUE NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    medical_history TEXT NOT NULL,
    current_status TEXT NOT NULL,
    relevant_findings TEXT NOT NULL,
    investigations TEXT,
    current_care TEXT,
    data_completeness DECIMAL(5, 2) DEFAULT 0.0, -- Percentage 0.00 to 100.00
    missing_information JSONB DEFAULT '[]'::jsonb, -- Array of flagged omissions
    data_provenance JSONB DEFAULT '{}'::jsonb -- Track source of each field
);
```

### 3.5 `documents` (Supporting Evidence & Clinical Notes)
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    storage_key VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL, -- SHA-256 for integrity
    document_type VARCHAR(100) NOT NULL, -- 'LAB_REPORT', 'CLINICAL_NOTE', 'POLICY'
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.6 `clinical_options`
```sql
CREATE TABLE clinical_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    option_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    expected_benefit_raw DECIMAL(6, 2), -- Raw clinical score / scale
    safety_raw DECIMAL(6, 2),           -- Complication score
    recovery_probability_raw DECIMAL(5, 2), -- Percentage (0-100%)
    urgency_alignment_raw VARCHAR(50),  -- Alignment rating (LOW, MODERATE, HIGH, CRITICAL)
    patient_preference_raw DECIMAL(4, 2),-- 1.0 to 10.0 scale
    risk_raw DECIMAL(6, 2),             -- Adverse risk score
    resource_requirement_raw VARCHAR(50),-- LOW, MODERATE, HIGH, EXTREME
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.7 `criteria`
```sql
CREATE TABLE criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    weight DECIMAL(5, 4) NOT NULL, -- Sum of weights per case = 1.0000
    direction VARCHAR(10) NOT NULL CHECK (direction IN ('MAX', 'MIN')),
    template_origin VARCHAR(100) DEFAULT 'GENERAL_CLINICAL',
    last_modified_by UUID REFERENCES users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.8 `option_scores` (With Dual Raw & Normalized Representation + Provenance)
```sql
CREATE TABLE option_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    option_id UUID NOT NULL REFERENCES clinical_options(id) ON DELETE CASCADE,
    criterion_id UUID NOT NULL REFERENCES criteria(id) ON DELETE CASCADE,
    raw_value VARCHAR(100) NOT NULL,       -- Stored as entered (e.g. "80%", "CRITICAL", "8.5")
    normalized_score DECIMAL(5, 4) NOT NULL CHECK (normalized_score >= 0.0 AND normalized_score <= 1.0),
    source VARCHAR(50) NOT NULL CHECK (source IN ('DOCTOR_ENTERED', 'AI_EXTRACTED', 'SYSTEM_CALCULATED', 'IMPORTED_RECORD')),
    source_reference TEXT,                 -- Document ID, line number, or clinician note
    entered_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.9 `knowledge_documents` & `knowledge_chunks` (RAG Governance)
```sql
CREATE TABLE knowledge_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL, -- e.g. "WHO Clinical Guidelines", "Hospital Ethics Policy"
    document_type VARCHAR(100) NOT NULL,
    version VARCHAR(50) NOT NULL,
    effective_date DATE,
    jurisdiction VARCHAR(100),
    organization VARCHAR(255),
    reference_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
    chunk_text TEXT NOT NULL,
    embedding vector(768), -- Dimension matches EMBEDDING_MODEL
    page_number INT,
    section VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.10 `ai_analyses` (With Reproducibility Audit)
```sql
CREATE TABLE ai_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    clinical_factors JSONB NOT NULL DEFAULT '[]'::jsonb,
    candidate_ethical_issues JSONB NOT NULL DEFAULT '[]'::jsonb,
    missing_information JSONB NOT NULL DEFAULT '[]'::jsonb,
    ai_interpretation TEXT NOT NULL, -- Natural language synthesis (NOT an autonomous decision)
    trade_off_explanation TEXT NOT NULL,
    retrieved_sources JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of chunk/doc IDs
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    prompt_version VARCHAR(50) NOT NULL,
    input_hash VARCHAR(64) NOT NULL,
    output_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.11 `safety_events`
```sql
CREATE TABLE safety_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL CHECK (event_type IN (
        'CRITICAL_URGENCY',
        'MISSING_REQUIRED_DATA',
        'UNSTABLE_RECOMMENDATION',
        'ETHICAL_CONFLICT',
        'DEMOGRAPHIC_SENSITIVITY_FLAG'
    )),
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    trigger VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ACKNOWLEDGED', 'RESOLVED')),
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.12 `ethical_conflicts`
```sql
CREATE TABLE ethical_conflicts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    conflict_type VARCHAR(100) NOT NULL CHECK (conflict_type IN (
        'urgency_vs_benefit',
        'benefit_vs_safety',
        'patient_preference_vs_clinical',
        'benefit_vs_resources',
        'stakeholder_disagreement',
        'recommendation_instability',
        'fairness_concern'
    )),
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    factor_a VARCHAR(255) NOT NULL,
    factor_b VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    resolution_required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.13 `stakeholder_opinions` & `voting_sessions`
```sql
CREATE TABLE voting_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID UNIQUE NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    state VARCHAR(50) NOT NULL DEFAULT 'OPEN' CHECK (state IN (
        'OPEN',
        'SUBMISSIONS_IN_PROGRESS',
        'LOCKED',
        'REVEALED',
        'DISCUSSION',
        'RESOLUTION'
    )),
    opened_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    locked_at TIMESTAMP WITH TIME ZONE,
    revealed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE stakeholder_opinions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    stakeholder_id UUID NOT NULL REFERENCES users(id),
    role VARCHAR(50) NOT NULL,
    preferred_option UUID REFERENCES clinical_options(id),
    reasoning TEXT NOT NULL,
    concerns TEXT,
    missing_information TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_case_stakeholder_opinion UNIQUE (case_id, stakeholder_id)
);
```

### 3.14 `consensus`
```sql
CREATE TABLE consensus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID UNIQUE NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    plurality_support_percentage DECIMAL(5, 2) NOT NULL, -- Votes for winning option / total votes
    plurality_option_id UUID REFERENCES clinical_options(id),
    agree_count INT NOT NULL,
    disagree_count INT NOT NULL,
    total_votes INT NOT NULL,
    consensus_status VARCHAR(50) NOT NULL CHECK (consensus_status IN (
        'CONSENSUS_REACHED',    -- Plurality >= 75%
        'SPLIT_DECISION',        -- Plurality 50% - 74%
        'SEVERE_DISAGREEMENT'    -- Plurality < 50%
    )),
    main_disagreement_driver TEXT,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.15 `decision_snapshots` (Frozen State at Moment of Human Decision)
```sql
CREATE TABLE decision_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    mcdm_version VARCHAR(50) NOT NULL,
    criteria_weights_snapshot JSONB NOT NULL,
    option_scores_snapshot JSONB NOT NULL,
    mcdm_ranking_snapshot JSONB NOT NULL,
    mcdm_winner_id UUID NOT NULL REFERENCES clinical_options(id),
    stability_index DECIMAL(5, 2) NOT NULL,
    stability_margin DECIMAL(5, 2) NOT NULL,
    ai_analysis_id UUID REFERENCES ai_analyses(id),
    active_conflicts_snapshot JSONB NOT NULL,
    consensus_state_snapshot JSONB NOT NULL,
    human_decision_id UUID NOT NULL REFERENCES clinical_options(id),
    decision_type VARCHAR(50) NOT NULL CHECK (decision_type IN ('ACCEPT', 'MODIFY', 'REJECT')),
    override_justification TEXT,
    reviewer_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.16 `audit_logs` (Tamper-Evident Cryptographic Hash Chain)
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    old_value JSONB,
    new_value JSONB,
    reason TEXT,
    previous_hash VARCHAR(64) NOT NULL, -- SHA-256 of preceding audit log record
    event_hash VARCHAR(64) NOT NULL,    -- SHA-256(previous_hash + action + entity + timestamp + user_id + payload)
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Normalization Layer & MCDM Mathematical Engine

### 4.1 Strict Linear Normalization ($0.0 \to 1.0$)
To prevent mixing incompatible units (percentage, Likert scales, categorical ratings), all criteria are normalized deterministically before running MCDM.

#### For Maximization Criteria (Higher is Better: Benefit, Recovery, Safety):
$$s_{ij} = \frac{x_{ij} - \min_j(x_{ij})}{\max_j(x_{ij}) - \min_j(x_{ij}) + \epsilon}$$
*(Or absolute scale mapping: e.g. Recovery $80\% \to 0.80$, Scale $1\text{–}10 \to \frac{\text{score}}{10}$)*

#### For Minimization Criteria (Lower is Better: Risk, Resource Drain):
$$s_{ij} = 1.0 - \frac{x_{ij} - \min_j(x_{ij})}{\max_j(x_{ij}) - \min_j(x_{ij}) + \epsilon}$$

#### Categorical Normalization:
- **Urgency Alignment:** `LOW` $\to 0.25$, `MODERATE` $\to 0.50$, `HIGH` $\to 0.75$, `CRITICAL` $\to 1.00$
- **Resource Requirement:** `LOW` $\to 1.00$ (favorable), `MODERATE` $\to 0.70$, `HIGH` $\to 0.40$, `EXTREME` $\to 0.10$

### 4.2 Weighted Sum Scoring
$$\text{Score}(O_j) = \sum_{i=1}^{n} w_i \times s_{ij}$$
Where $\sum_{i=1}^{n} w_i = 1.0000$ and $s_{ij} \in [0.0, 1.0]$.

### 4.3 Default Criteria Configuration Templates
The system supports physician-governed templates. **Weights are never silently altered by AI.**

```text
Template 1: General Clinical Decision
• Expected Benefit (MAX): 0.30
• Safety / Low Complication (MAX): 0.25
• Recovery Probability (MAX): 0.20
• Urgency Alignment (MAX): 0.15
• Patient Preference (MAX): 0.10

Template 2: Critical Care / Acute Intervention
• Urgency Alignment (MAX): 0.35
• Safety (MAX): 0.25
• Expected Benefit (MAX): 0.20
• Resource Requirement (MIN): 0.10
• Patient Preference (MAX): 0.10

Template 3: Ethics & Patient Autonomy Heavy
• Patient Preference (MAX): 0.30
• Expected Benefit (MAX): 0.25
• Safety (MAX): 0.20
• Recovery Probability (MAX): 0.15
• Resource Requirement (MIN): 0.10
```

---

## 5. Sensitivity, Stability & Algorithmic Governance

### 5.1 Sensitivity Analysis & Crossover Detection
- The user dynamically adjusts any criterion weight $w_k \in [0.05, 0.80]$.
- Remaining weights $w_{i \neq k}$ are normalized proportionally:
  $$w_i' = w_i \times \frac{1 - w_k'}{\sum_{m \neq k} w_m}$$
- **Crossover Point:** The exact weight threshold where the plurality winner changes (e.g. *"At Urgency Weight $\ge 38.5\%$, Option C surpasses Option B"*).

### 5.2 Recommendation Stability Simulation (Dirichlet Sampling)
Instead of arbitrary Gaussian noise, weights are perturbed using a mathematically sound **Dirichlet distribution**:
$$\mathbf{w} \sim \text{Dirichlet}(\alpha \cdot \mathbf{w}_{\text{baseline}})$$
With concentration parameter $\alpha = 50$ (simulating controlled, valid multi-criteria weight uncertainty where $\sum w_i = 1$ and $w_i > 0$).

- Run $N = 5,000$ Monte Carlo iterations.
- Record victory count for each candidate option:
  $$\text{Recommendation Stability Index} = \frac{\text{Wins}(O_{\text{winner}})}{N} \times 100\%$$
  $$\text{Stability Margin} = \frac{\text{Wins}(O_{\text{winner}}) - \text{Wins}(O_{\text{runner-up}})}{N} \times 100\%$$
- **Threshold Gating:**
  - $\text{Stability Index} \ge 75\%$ AND $\text{Stability Margin} \ge 15\%$: **STABLE**
  - Otherwise: **UNSTABLE** $\rightarrow$ Triggers `safety_event` and `human_review_required = TRUE`.

### 5.3 Fairness & Criterion Governance Screening
A 6-step deterministic screen:
1. **Definition Check:** Is every criterion explicitly named and scoped?
2. **Clinical Justification Check:** Is the criterion backed by clinical/ethical rationale?
3. **Consistency Check:** Is the criterion scored across all options identically?
4. **Proxy Screening:** Are non-clinical demographic factors (race, gender, socioeconomic status) excluded from scoring criteria?
5. **Ablation Test:** Does removing any single controversial criterion change the winning option?
6. **Counterfactual Fairness Simulation:** 
   - Re-runs the extraction and scoring pipeline with swapped demographic variables (e.g. Age bracket, Gender).
   - If the MCDM winner or rank shifts solely due to demographic perturbation: **FLAGGED FOR BIAS**.

---

## 6. Streamlined 3-Pipeline AI Architecture

Instead of fragmented micro-services, the AI subsystem is organized into **three coherent pipelines**:

```text
┌──────────────────────────────────────────────────────────────┐
│ PIPELINE A: CLINICAL UNDERSTANDING                           │
│ Input: Raw clinical notes, labs, history                     │
│ 1. Structured Clinical Entity Extraction (JSON Schema)       │
│ 2. Missing Information Screening (Checklist + Semantic Gap)  │
│ 3. Clinical Executive Summarization                          │
│ Output: Structured clinical record + completeness score      │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ↓
┌──────────────────────────────────────────────────────────────┐
│ PIPELINE B: EVIDENCE RETRIEVAL & ETHICAL CANDIDATE IDENTIFIER │
│ Input: Extracted case factors + clinical options             │
│ 1. pgvector Semantic Search over knowledge base (Top-K)      │
│ 2. Citation Assembly (Guideline title, section, version)     │
│ 3. Candidate Ethical Issue Identification (Tensions flagged) │
│ Output: Grounded citations + raw ethical candidate list      │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ↓
┌──────────────────────────────────────────────────────────────┐
│ PIPELINE C: EXPLAINABILITY & SYNTHESIS                       │
│ Input: Mathematical MCDM results + Stability + Conflicts     │
│ 1. Natural Language Explanation of "Why Option X Won"        │
│ 2. Objective Trade-Off Synthesis (Pros/Cons without ranking) │
│ 3. Plain-Language Summary for Patient View                   │
│ Output: Human-readable rationale (AI-supported interpretation)│
└──────────────────────────────────────────────────────────────┘
```

---

## 7. Collaborative Stakeholder Deliberation & Blind Voting

### 7.1 Role-Specific Views (Information Segregation)
1. **Patient View:**
   - Plain-language case summary.
   - Transparent options overview.
   - Preference entry, consent considerations, and personal concerns.
2. **Treating Doctor View:**
   - Full clinical details, lab reports, raw option scores.
   - MCDM calculations, sensitivity sliders, stability metrics.
   - Option nomination and clinical rationale.
3. **Appointed Doctor View (Second Opinion):**
   - Anonymized clinical case and proposed options.
   - Independent scoring and peer critique.
4. **Medical / Ethics Official View:**
   - Ethical conflicts dashboard, fairness screening audit.
   - Hospital policy compliance, consensus breakdown.
5. **Administrator View:**
   - User RBAC management, cryptographic audit trail verification, knowledge base management.

### 7.2 Strict Voting State Machine
To prevent API sniffing and anchoring bias:
```text
[OPEN] → Deliberation window starts. Stakeholders can review case.
   ↓
[SUBMISSIONS_IN_PROGRESS] → Stakeholders submit encrypted/hidden votes & opinions.
   ↓ (All required votes submitted OR deadline expired)
[LOCKED] → No more submissions or modifications allowed.
   ↓ (System verification)
[REVEALED] → Opinions and votes unblinded simultaneously; consensus computed.
   ↓
[DISCUSSION] → Stakeholders view dissenting views and enter commentary.
   ↓
[RESOLUTION] → Transition to Final Human Decision gate.
```

### 7.3 Consensus Metrics
- **Plurality Support %:**
  $$\text{Plurality Support} = \frac{\text{Votes for Leading Option}}{\text{Total Votes Cast}} \times 100\%$$
- **Consensus Classification:**
  - $\ge 75\%$: `CONSENSUS_REACHED`
  - $50\%\text{–}74\%$: `SPLIT_DECISION`
  - $< 50\%$: `SEVERE_DISAGREEMENT` (Triggers immediate human clinical review)

---

## 8. Decision Transparency, Human Override & Frozen Snapshots

### 8.1 Decision Transparency ("WHY?" Decomposition)
The UI presents the exact mathematical and qualitative chain:
$$\text{Total Score}(O_j) = w_1 s_{1j} + w_2 s_{2j} + \dots + w_n s_{nj}$$
- Visual waterfall breakdown of each criterion's point contribution.
- Display of data provenance: who entered each score and what document verified it.
- Sensitivity crossover threshold indicators.

### 8.2 Human Decision Gate
The attending physician retains exclusive final clinical authority:
- **ACCEPT:** Confirms the MCDM winning option.
- **MODIFY:** Accepts the option with documented conditional adjustments.
- **REJECT / OVERRIDE:** Selects a non-recommended option.
  - **Mandatory Override Protocol:** The system locks submission until a structured clinical justification is entered (e.g. *"Acute decompensation risk makes immediate catheterization dominant over long-term benefit"*).

### 8.3 Frozen Decision Snapshot
At the precise moment of decision, the system compiles a `decision_snapshot` row capturing the exact state of criteria, weights, scores, AI analysis ID, stability metrics, and consensus distribution. Subsequent edits to case data will **never** alter historical decision snapshots.

---

## 9. Tamper-Evident Cryptographic Audit Trail

Every state change computes a cryptographic SHA-256 hash linked to the preceding event:
$$\text{Event Hash}_k = \text{SHA-256}(\text{Event Hash}_{k-1} + \text{Action} + \text{Entity} + \text{UserID} + \text{Payload} + \text{Timestamp})$$

### Audit Verification Utility
A built-in verification function iterates through the chain from genesis:
- Recalculates expected hashes sequentially.
- If any row in the database has been modified, deleted, or inserted out of order, the verification raises an immediate **TAMPER_DETECTED** alert.

---

## 10. Automated Ethical Decision Report

The backend generates a formal, exportable PDF and Markdown document containing:
1. Executive Case Summary & Anonymized Patient Code.
2. Clinical Options Evaluated & Raw Data Provenance.
3. Knowledge Base Evidence Citations.
4. MCDM Score Matrix & Waterfall Contribution Breakdown.
5. Sensitivity Analysis & Decision Stability Index ($N=5,000$).
6. Active Ethical Conflicts & Resolution Records.
7. Fairness & Criterion Governance Audit.
8. Stakeholder Blind Voting Record & Consensus Metrics.
9. Final Human Clinical Decision & Structured Override Justification.
10. Complete Cryptographic Audit Chain Verification Stamp.

---

## 11. Streamlined Project Directory Structure

```text
EthicSync/
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/login/
│   │   ├── dashboard/
│   │   ├── cases/
│   │   │   ├── page.tsx                  # Case queue (role-filtered)
│   │   │   ├── new/                      # Case intake wizard
│   │   │   └── [id]/
│   │   │       ├── overview/             # Case summary & status banner
│   │   │       ├── clinical-info/        # Clinical data, missing info checklist
│   │   │       ├── decision-support/     # MCDM, Sensitivity, Stability, Radar
│   │   │       ├── ethical-governance/   # Conflicts, Fairness screen
│   │   │       ├── deliberation/         # Blind voting chamber, Consensus
│   │   │       ├── human-decision/       # Final decision portal, Override form
│   │   │       ├── audit/                # Tamper-evident log viewer & verify
│   │   │       └── report/               # Interactive report & PDF export
│   │   ├── notifications/
│   │   └── settings/
│   ├── components/
│   │   ├── ui/                           # shadcn/ui primitives
│   │   ├── charts/                       # Recharts: Radar, Waterfall, Sensitivity, Gauge
│   │   ├── cases/                        # Intake steps, CaseCard, ProvenanceTag
│   │   ├── decision/                     # MCDM Matrix, What-If Slider, StabilityCard
│   │   ├── deliberation/                 # VotingCard, ConsensusMeter, RevealState
│   │   └── layout/                       # Role-aware Sidebar, Header, Breadcrumbs
│   ├── lib/                              # Axios client, auth helpers, formatters
│   ├── hooks/                            # useCaseData, useMCDM, useVotingSession
│   └── types/                            # TypeScript interfaces matching Pydantic
│
├── backend/
│   ├── app/
│   │   ├── main.py                       # FastAPI entrypoint, CORS, exception handlers
│   │   ├── core/
│   │   │   ├── config.py                 # Env vars (LLM, DB, Security)
│   │   │   ├── security.py               # Password hash, JWT token issuance
│   │   │   └── database.py               # PostgreSQL engine & sessionmaker
│   │   ├── api/
│   │   │   ├── auth.py                   # Login, register, me
│   │   │   ├── cases.py                  # Case lifecycle & clinical info CRUD
│   │   │   ├── documents.py              # File upload, SHA-256 validation
│   │   │   ├── options.py                # Options, criteria templates, scores
│   │   │   ├── ai.py                     # Pipelines A, B, C execution
│   │   │   ├── decision.py               # MCDM, Sensitivity, Stability
│   │   │   ├── deliberation.py           # Blind voting, reveal, consensus
│   │   │   ├── governance.py             # Conflicts, fairness, safety events
│   │   │   ├── human_decision.py         # Final decision & snapshot creation
│   │   │   ├── audit.py                  # Hash chain retrieval & integrity check
│   │   │   └── reports.py                # PDF & Markdown report compiler
│   │   ├── models/                       # SQLAlchemy declarative models
│   │   ├── schemas/                      # Pydantic schemas (Contracts)
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   │   ├── clinical_pipeline.py  # Pipeline A
│   │   │   │   ├── rag_pipeline.py       # Pipeline B
│   │   │   │   └── explanation_pipeline.py # Pipeline C
│   │   │   ├── decision/
│   │   │   │   ├── normalizer.py         # Linear & scale normalizers
│   │   │   │   ├── mcdm.py               # Weighted sum algorithm
│   │   │   │   ├── sensitivity.py        # Crossover point simulator
│   │   │   │   ├── stability.py          # Dirichlet Monte Carlo simulator
│   │   │   │   ├── conflicts.py          # Rule-based conflict detector
│   │   │   │   └── fairness.py           # Fairness & counterfactual tests
│   │   │   ├── safety/
│   │   │   │   └── rules.py              # Urgency & missing info safety gates
│   │   │   └── audit/
│   │   │       └── hash_chain.py         # Cryptographic audit recorder
│   ├── alembic/                          # DB migrations
│   └── tests/
│       ├── unit/                         # Math, normalization, hash chain tests
│       ├── integration/                  # API endpoints, state machine tests
│       └── demo/
│           └── test_synthetic_cases.py   # Automated validation of 6 demo cases
│
├── docs/
│   ├── architecture.md                   # System Architecture Specification
│   ├── er_diagram.md                     # Database ER Specifications
│   ├── decision_algorithm.md             # Mathematical proof & normalization logic
│   └── demo_scenarios.json               # Seed data for the 6 synthetic test cases
│
└── PROJECT_PLAN.md                       # Master Single Source of Truth
```

---

## 12. Revised Implementation Order & Stage Milestones

### Phase 0: Foundation Documents (Frozen Specifications)
- [ ] `docs/architecture.md` (System components, boundary rules, sequence flows)
- [ ] `docs/er_diagram.md` (Complete relational schema, vector tables, hash chain)
- [ ] `docs/decision_algorithm.md` (Normalization formulas, Dirichlet stability, crossover math)
- [ ] `docs/demo_scenarios.json` (6 verifiable synthetic case datasets)

### Stage 1: Core Database & Authentication
- [ ] PostgreSQL + `pgvector` container setup.
- [ ] SQLAlchemy models & Alembic initial migration.
- [ ] Cryptographic hash chain audit log service.
- [ ] JWT authentication with 5 RBAC roles.
- [ ] Automated unit test verifying audit chain tamper detection.

### Stage 2: Case & Document Management
- [ ] Case lifecycle state machine (`DRAFT` $\to$ `ARCHIVED`).
- [ ] Clinical Information CRUD with Missing Information deterministic checklist.
- [ ] Document upload endpoint with SHA-256 integrity hash.
- [ ] Case intake API validation tests.

### Stage 2.5: Decision Engine Prototype (Python CLI / Independent Test Suite)
*Build and verify the core mathematics independently before building UI or integrating LLMs:*
- [ ] Implement `normalizer.py` (Handling MIN/MAX directions and scale mappings).
- [ ] Implement `mcdm.py` (Weighted sum scoring and ranking).
- [ ] Implement `sensitivity.py` (Dynamic weight stepping and crossover point finder).
- [ ] Implement `stability.py` (Dirichlet $N=5,000$ Monte Carlo simulation).
- [ ] Implement `conflicts.py` (7 conflict rule categories).
- [ ] Run `test_synthetic_cases.py` on `docs/demo_scenarios.json` to verify that all mathematical winners, crossovers, and conflicts match expected ground truth.

### Stage 3: Decision Engine REST API & Safety Layer
- [ ] Expose MCDM, sensitivity, and stability endpoints in FastAPI.
- [ ] Implement `safety_events` table and urgency gating rules.
- [ ] Criteria template configuration endpoints.

### Stage 4: AI Pipelines & RAG Knowledge Base
- [ ] Setup provider-agnostic LLM/Embedding client (`.env` configuration).
- [ ] Ingest reference clinical guidelines into `knowledge_documents` and `knowledge_chunks`.
- [ ] Pipeline A: Clinical entity extraction and summarization.
- [ ] Pipeline B: `pgvector` Top-K retrieval and candidate ethical issue identification.
- [ ] Pipeline C: Explainability synthesis (translating MCDM results into natural language).

### Stage 5: Deliberation, Blind Voting & Consensus
- [ ] Voting session state machine (`OPEN` $\to$ `RESOLUTION`).
- [ ] Role-differentiated opinion submission endpoints.
- [ ] Blind reveal trigger and plurality support / consensus computation.

### Stage 6: Governance, Human Final Decision & Snapshots
- [ ] Human decision submission endpoint (Accept / Modify / Reject).
- [ ] Mandatory override justification validator.
- [ ] Point-in-time `decision_snapshots` creator.
- [ ] Tamper-evident audit trail recording.

### Stage 7: Automated Ethical Decision Report
- [ ] PDF & Markdown compilation service using ReportLab / WeasyPrint.
- [ ] Inclusion of decision snapshot, MCDM waterfall, stability margin, and audit hash stamp.

### Stage 8: Next.js Frontend Development
- [ ] Role-aware layout, authentication guard, and navigation sidebar.
- [ ] Case intake wizard with validation.
- [ ] Interactive Decision Support workspace (Recharts radar, what-if sensitivity sliders, stability gauge).
- [ ] Blind deliberation chamber with reveal animation.
- [ ] Human Decision & Override portal.
- [ ] Audit trail viewer with real-time "Verify Integrity" button.
- [ ] Report generation and download view.

### Stage 9: End-to-End Verification & Demo Readiness
- [ ] Seed 6 synthetic demo cases via automated script.
- [ ] Execute full 10-scene demonstration walkthrough.
- [ ] Performance and security validation (RBAC enforcement).

---

## 13. The 6 Synthetic Demonstration Cases

Defined in `docs/demo_scenarios.json` and executed through the decision engine:

1. **Case 1: The Stable Baseline Case**
   - Condition: Stable Coronary Artery Disease.
   - MCDM Winner: Option B (Optimal Medical Therapy).
   - Stability Index: $92.4\%$, Stability Margin: $85.2\%$.
   - Consensus: $100\%$ unanimous agreement.
   - Human Decision: ACCEPT.
2. **Case 2: High Ethical Tension (Urgency vs Benefit)**
   - Condition: Acute Coronary Syndrome with Severe Multivessel Disease.
   - Option B: High expected long-term benefit, but delayed intervention.
   - Option C: Immediate catheterization / revascularization.
   - Conflict Detected: `urgency_vs_benefit` (Severity: HIGH).
   - Sensitivity: Increasing urgency weight past $38.5\%$ flips winner from Option B $\to$ Option C.
3. **Case 3: Recommendation Instability (Close Margin)**
   - Condition: Complex Aortic Aneurysm in Frail Elderly Patient.
   - Scores: Option B ($51.2\%$), Option C ($48.8\%$).
   - Stability Index: $51.2\%$, Margin: $2.4\%$ (< $15\%$ threshold).
   - Red Flag: `UNSTABLE_RECOMMENDATION` $\rightarrow$ Mandatory Multidisciplinary Review.
4. **Case 4: Severe Stakeholder Disagreement**
   - Condition: Palliative Oncological Care vs Experimental Immunotherapy.
   - Treating Oncologist: Option A (Aggressive Trial).
   - Appointed Second Doctor: Option B (Standard Regimen).
   - Patient / Family: Option B.
   - Ethics Official: Option C (Palliative Comfort Care).
   - Plurality Support: $50\%$ (`SPLIT_DECISION`).
5. **Case 5: Missing Critical Data Safety Gate**
   - Condition: Acute Sepsis with Unknown Source.
   - Missing: Renal function lab panel & Penicillin allergy verification.
   - Missing Data Engine: Blocks automated recommendation $\to$ Triggers `safety_event` (`MISSING_REQUIRED_DATA`).
6. **Case 6: Human Override**
   - Condition: Subacute Subdural Hematoma.
   - MCDM Winner: Option B (Conservative Observation, Score: 8.4).
   - Attending Neurosurgeon Override: Option C (Burr-Hole Evacuation).
   - Override Justification: *"Emergent neurologic deterioration observed during physical exam makes immediate surgical decompression necessary despite baseline MCDM score."*
   - Audit Chain: Cryptographically records AI interpretation, MCDM score, clinician override, and exact rationale.

---

## 14. What Is Explicitly Excluded from MVP (Scope Guard)

To ensure high quality and prevent deadline failure, the following are strictly deferred:
- ❌ Direct EHR / FHIR production integrations.
- ❌ Custom training or fine-tuning of proprietary medical LLMs.
- ❌ Complicated microservice architectures (FastAPI modular monolith is used).
- ❌ Global WebSocket connection management (REST + TanStack Query is used).
- ❌ Automated real-world prescription or diagnosis execution.
- ❌ Third-party hospital billing or administrative system hooks.
