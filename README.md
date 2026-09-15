# EthicSync

> **AI-Assisted Explainable Clinical Decision Support, Ethical Deliberation & Human Governance Platform**

EthicSync is a hybrid AI and multi-criteria decision-support platform that analyzes clinical cases, compares competing options mathematically, detects ethical conflicts and unstable recommendations, incorporates independent stakeholder perspectives, and preserves human control through transparent final decisions and complete auditability.

---

## 📖 Master Project Plan

The complete architectural specification, database schema, mathematical formulations, and implementation roadmap are documented in:
👉 **[PROJECT_PLAN.md](PROJECT_PLAN.md)**

---

## 🏛️ Core Foundational Principle

> **AI interprets and explains; deterministic engines score and analyze; safety rules gate decisions; stakeholders deliberate independently; humans retain final authority; and every decision state is auditable.**

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui, Recharts
- **Backend:** Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy 2.0, Alembic
- **Database:** PostgreSQL 16 + `pgvector`
- **Mathematics:** NumPy, Pandas, SciPy (Dirichlet sampling, linear normalization)
- **AI & RAG:** Provider-agnostic LLM APIs, semantic vector retrieval via `pgvector`
- **Security & Audit:** JWT RBAC (5 roles), Cryptographic SHA-256 tamper-evident hash chain
