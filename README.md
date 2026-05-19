![InsightU Logo](https://res.cloudinary.com/drfodwc7q/image/upload/v1779172990/l_logo_dwvinp.png)

# InsightU — Campus Intelligence Network

> A peer-verified, sovereign academic intelligence platform that democratizes the "invisible curriculum" for first-generation college students.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## 📋 Table of Contents

- [Hackathon Context](#-hackathon-context)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Core Features](#-core-features)
- [System Architecture](#-system-architecture)
- [Dynamic Trust Engine](#-dynamic-trust-engine)
- [Tech Stack](#-tech-stack)
- [Project File Structure](#-project-file-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Developer](#-developer)
- [License](#-license)

---

## 🏆 Hackathon Context

| Field | Detail |
| :--- | :--- |
| **Event** | Commit Happens 2026 |
| **Host** | University School of Information, Communication and Technology (USICT), GGSIPU, New Delhi |
| **Mode** | Online |
| **Theme** | EdTech / Social Impact |
| **Team Name** | CodeSpark |
| **Product** | InsightU — Campus Intelligence Network |
| **Track** | Full-Stack Web Application |

---

## 🔴 The Problem

First-generation college students face a devastating **information asymmetry** that their peers from privileged backgrounds never encounter:

- **Hidden Recruitment Pipelines** — Placement timelines, referral windows, and company shortlists circulate through informal networks that first-gen students are excluded from.
- **The Invisible Curriculum** — Faculty preferences for grading, exam patterns, scholarship deadlines, and capstone prerequisite changes are passed down through senior-to-junior oral traditions that break when family networks don't exist.
- **Zero Institutional Memory** — When seniors graduate, their hard-won knowledge about department norms, administrative loopholes, and career shortcuts vanishes permanently.
- **Unverified Noise** — WhatsApp groups and social media are flooded with unverified, outdated, or deliberately misleading information that causes real academic and career damage.

> _"67% of first-generation students report missing at least one critical academic or career deadline due to lack of access to informal peer networks."_

---

## 🟢 Our Solution

**InsightU** is a sovereign, peer-verified intelligence network that captures, verifies, and distributes structured institutional knowledge across college campuses.

### How It Works

```
┌─────────────────────┐     ┌────────────────────────┐     ┌──────────────────────┐
│   STUDENT SUBMITS   │────▶│  PEER VERIFICATION     │────▶│  TRUSTED INTEL FEED  │
│   Intelligence Post │     │  (Vote + Trust Engine)  │     │  (Filtered & Ranked) │
└─────────────────────┘     └────────────────────────┘     └──────────────────────┘
         │                           │                              │
    Title, Desc,              VALID / INVALID              Branch-filtered,
    Category, Urgency,        votes from peers             urgency-tagged,
    Branch Tag, Files         with dynamic weight          credibility-scored
```

Instead of relying on unstructured chat groups, students contribute **categorized, tagged, and file-supported intelligence posts** that are collectively verified by the campus community through a weighted consensus algorithm.

---

## ✨ Core Features

### 📊 Structured Intel Submission
Submit categorized knowledge posts with titles, descriptions, branch tags, urgency levels (Low / Medium / Critical), and optional file attachments uploaded securely to Cloudinary.

### 🛡️ Dynamic Trust & Verification Engine
Every vote is weighted dynamically based on the voter's individual reliability score and role tier. A `VERIFIED_SENIOR` with a high trust index carries exponentially more verification power than a freshly registered account. Posts that accumulate a net score below **-5** are automatically flagged and hidden from the public feed.

### 🎯 Branch & Urgency Filtered Feeds
Students see intelligence relevant to their specific department and branch, with pulsing urgency indicators that highlight time-sensitive deadlines and critical alerts.

### 👤 Gamified Profile Tracking
Every user has a live reliability score that increases when their posts are validated and decreases when they're flagged. This creates a self-regulating ecosystem of accountability.

### 🔐 Complete Authentication System
Full email-verified signup flow with 6-digit OTP verification (via Resend), JWT-based session management, and secure password reset capabilities.

### 📁 Cloudinary Media Storage
File attachments (PDFs, images) are uploaded to Cloudinary through a secure backend-routed pipeline, organized inside the `insightU` cloud folder.

### 🎫 Live Support Ticket System
Students can submit support tickets directly from the platform. Tickets are persisted to MongoDB and trigger automated email confirmations via Resend.

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                        │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │  (main)      │  │  (auth)      │  │  dashboard                │  │
│  │  Landing     │  │  Login       │  │  Overview (Live Stats)    │  │
│  │  About       │  │  Signup      │  │  Feed (Filtered Intel)    │  │
│  │  Support     │  │  Verify-OTP  │  │  Contribute (Submit Form) │  │
│  │  Legal Pages │  │  Forgot-Pass │  │  Account (Profile Mgmt)   │  │
│  │              │  │  Reset-Pass  │  │                           │  │
│  └──────────────┘  └──────────────┘  └───────────────────────────┘  │
│                                                                      │
│  State: Redux Toolkit + React Query  │  UI: shadcn/ui + Tailwind 4  │
└───────────────────────────┬──────────────────────────────────────────┘
                            │ REST API (Bearer JWT)
┌───────────────────────────▼──────────────────────────────────────────┐
│                       BACKEND (Express 5)                            │
│                                                                      │
│  Middlewares: Helmet │ CORS │ Rate Limiter │ JWT Auth │ Error Handler│
│                                                                      │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────────┐   │
│  │ Auth Service   │  │ Intel Service   │  │ Verification Service│   │
│  │ Signup/Login   │  │ CRUD Posts      │  │ Atomic Transactions │   │
│  │ OTP/Verify     │  │ Filtered Feed   │  │ Dynamic Trust Engine│   │
│  │ Password Reset │  │ File Handling   │  │ Auto-Flag at -5     │   │
│  └────────────────┘  └─────────────────┘  └─────────────────────┘   │
│                                                                      │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────────┐   │
│  │ Stats Service  │  │ Cloudinary Svc  │  │ Resend Email Svc    │   │
│  │ Dashboard Agg  │  │ Secure Uploads  │  │ OTP + Confirmations │   │
│  └────────────────┘  └─────────────────┘  └─────────────────────┘   │
│                                                                      │
│  ORM: Prisma Client 6  │  Database: MongoDB Atlas (Clustered)       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Dynamic Trust Engine

The voting system uses a **Dynamic Reliability Weight Index** that calculates vote impact based on each voter's active trust score:

```
Vote Weight = Base Weight × Dynamic Multiplier

Where:
  Base Weight     = 2.0 (VERIFIED_SENIOR) or 1.0 (FRESHER)
  Dynamic Mult.   = clamp(1 + reliabilityScore / 100, 0.1, 3.0)
```

| Voter Profile | Reliability Score | Multiplier | VALID Impact | INVALID Impact |
| :--- | :---: | :---: | :---: | :---: |
| New Fresher | 0 | 1.0× | +5 | -10 |
| Trusted Fresher | +50 | 1.5× | +8 | -15 |
| New Senior | 0 | 1.0× | +10 | -20 |
| Elite Senior | +100 | 2.0× | +20 | -40 |
| Flagged User | -80 | 0.2× | +1 | -2 |

> Posts with a net score ≤ **-5** are automatically set to `FLAGGED` status and removed from the public feed.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** (App Router) | React framework with SSR, route groups, and layouts |
| **React 19** | Component UI library |
| **TypeScript 5** | Static type safety across the entire frontend |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **shadcn/ui** (Base UI) | Accessible, headless UI component library |
| **Redux Toolkit** | Centralized state management (auth, user profiles) |
| **React Query (TanStack)** | Server-state caching & data fetching |
| **Recharts** | Data visualization (dashboard pie charts, metrics) |
| **Lucide React** | Icon library |
| **next-themes** | Dark/Light mode toggle |

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Node.js + Express 5** | REST API server |
| **TypeScript 5** | End-to-end type safety |
| **Prisma 6** | Type-safe ORM for MongoDB |
| **MongoDB Atlas** | Clustered NoSQL database |
| **JSON Web Tokens (JWT)** | Stateless session authentication |
| **bcryptjs** | Password hashing (salted + rounds) |
| **Helmet** | HTTP security headers |
| **express-rate-limit** | API rate limiting (100 reqs / 15 min) |
| **Cloudinary SDK** | Media file storage & CDN |
| **Resend** | Transactional email delivery (OTP, confirmations) |
| **Multer** | Multipart file upload parsing |

---

## 📁 Project File Structure

```
InsightU/
├── README.md
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                          # Server environment variables
│   ├── prisma/
│   │   └── schema.prisma             # MongoDB data models & indexes
│   └── src/
│       ├── index.ts                  # Express server entry point
│       ├── controllers/
│       │   ├── auth.controller.ts    # Signup, Login, Verify, Password Reset
│       │   ├── intel.controller.ts   # Create, Update, Delete, Feed posts
│       │   ├── verification.controller.ts  # Vote processing
│       │   ├── stats.controller.ts   # Dashboard statistics aggregation
│       │   ├── upload.controller.ts  # Cloudinary file upload handler
│       │   └── support.controller.ts # Support ticket creation
│       ├── services/
│       │   ├── auth.service.ts       # Authentication business logic
│       │   ├── intel.service.ts      # Post CRUD & filtered feed queries
│       │   ├── verification.service.ts # Dynamic Trust Engine (atomic tx)
│       │   ├── stats.service.ts      # Dashboard metric aggregation
│       │   └── cloudinary.service.ts # Cloudinary SDK configuration
│       ├── middlewares/
│       │   ├── auth.middleware.ts     # JWT Bearer token verification
│       │   ├── security.middleware.ts # Helmet + rate limiter setup
│       │   └── error.middleware.ts    # Centralized error boundary
│       ├── routes/
│       │   ├── auth.routes.ts        # /api/auth/* endpoints
│       │   └── api.routes.ts         # /api/* protected endpoints
│       └── lib/
│           ├── prisma.ts             # Prisma Client singleton
│           └── resend.ts             # Resend email helpers (OTP, support)
│
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── .env.local                    # Client environment variables
    ├── public/
    │   └── l_logo.png                # InsightU brand logo
    └── src/
        ├── app/
        │   ├── layout.tsx            # Root layout (fonts, providers, metadata)
        │   ├── globals.css           # Global styles & CSS custom properties
        │   ├── not-found.tsx         # Custom 404 page
        │   │
        │   ├── (main)/              # Public marketing route group
        │   │   ├── layout.tsx        # Shared Navbar + Footer wrapper
        │   │   ├── page.tsx          # Landing page (Hero, Features, Pulse)
        │   │   ├── _components/
        │   │   │   ├── Navbar.tsx    # Responsive nav with auth-aware menus
        │   │   │   └── Footer.tsx    # Site footer with brand logo
        │   │   ├── about/page.tsx    # About Us / Mission page
        │   │   ├── support/page.tsx  # Contact form + FAQ accordion
        │   │   └── legal/
        │   │       ├── terms/page.tsx
        │   │       ├── privacy/page.tsx
        │   │       └── safeguards/page.tsx
        │   │
        │   ├── (auth)/              # Authentication route group
        │   │   ├── layout.tsx        # Split-screen auth layout
        │   │   ├── login/page.tsx
        │   │   ├── signup/page.tsx
        │   │   ├── verify-email/page.tsx  # OTP input slots
        │   │   ├── forgot-password/page.tsx
        │   │   └── reset-password/page.tsx
        │   │
        │   └── dashboard/           # Protected app route group
        │       ├── layout.tsx        # Sidebar + header shell
        │       ├── page.tsx          # Overview (live stats, charts)
        │       ├── feed/page.tsx     # Filtered intel feed with vote UI
        │       ├── contribute/page.tsx # Submit new intelligence post
        │       ├── account/page.tsx  # Profile settings & avatar upload
        │       └── _components/
        │           ├── app-sidebar.tsx
        │           ├── nav-main.tsx
        │           ├── nav-user.tsx
        │           ├── nav-projects.tsx
        │           ├── site-header.tsx
        │           └── team-switcher.tsx
        │
        ├── components/ui/            # shadcn/ui component library
        ├── hooks/                    # Custom React hooks
        ├── lib/                      # Utility functions (cn, etc.)
        ├── providers/                # Theme & query providers
        └── store/
            ├── store.ts              # Redux Toolkit store configuration
            ├── provider.tsx          # Redux Provider wrapper
            └── slices/
                └── authSlice.ts      # Auth state (user, token, hydration)
```

---

## 🗄️ Database Schema

### Models

| Model | Purpose | Key Fields |
| :--- | :--- | :--- |
| **User** | Student profiles & credentials | `email`, `name`, `passwordHash`, `role`, `collegeId`, `reliabilityScore`, `avatarUrl` |
| **Account** | OAuth provider accounts | `provider`, `providerAccountId`, `access_token` |
| **Session** | Active user sessions | `sessionToken`, `expires` |
| **VerificationToken** | Email OTP codes | `identifier`, `token` (hashed), `expires` |
| **IntelPost** | Intelligence submissions | `title`, `description`, `category`, `branchTag`, `urgency`, `status`, `file` |
| **VerificationVote** | Peer verification votes | `postId`, `voterId`, `voteType` (VALID/INVALID) |
| **SupportTicket** | Student support requests | `name`, `email`, `category`, `description`, `status` |

### Enums

| Enum | Values |
| :--- | :--- |
| `Role` | `FRESHER`, `VERIFIED_SENIOR` |
| `Category` | `ACADEMIC_NORM`, `RECRUITMENT_PIPELINE`, `FACULTY_PREFERENCE`, `SCHOLARSHIP_DEADLINE` |
| `Urgency` | `LOW`, `MEDIUM`, `CRITICAL` |
| `Status` | `ACTIVE`, `FLAGGED` |
| `VoteType` | `VALID`, `INVALID` |

### Indexes (Performance-Optimized)

```prisma
@@index([collegeId, branchTag])                    # Branch-filtered queries
@@index([urgency])                                  # Urgency sorting
@@index([collegeId, branchTag, category, urgency]) # Composite feed filter
@@unique([postId, voterId])                        # Prevent duplicate votes
```

---

## 📡 API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| `POST` | `/api/auth/signup` | ❌ | Create account + send OTP email |
| `POST` | `/api/auth/verify-email` | ❌ | Validate 6-digit OTP code |
| `POST` | `/api/auth/login` | ❌ | Authenticate + receive JWT |
| `POST` | `/api/auth/forgot-password` | ❌ | Send password reset OTP |
| `POST` | `/api/auth/reset-password` | ❌ | Reset password with OTP |
| `PUT` | `/api/auth/update-profile` | ✅ | Update name, avatar, college |

### Intelligence (`/api`)
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| `POST` | `/api/intel` | ✅ | Submit a new intelligence post |
| `GET` | `/api/intel` | ❌ | Fetch filtered feed (search, category, urgency, branch) |
| `PUT` | `/api/intel/:id` | ✅ | Update an existing post |
| `DELETE` | `/api/intel/:id` | ✅ | Delete an existing post |
| `POST` | `/api/verify` | ✅ | Cast a verification vote (toggle/swap) |
| `GET` | `/api/stats/overview` | ✅ | Fetch dashboard aggregate stats |
| `POST` | `/api/upload` | ✅ | Upload file to Cloudinary |
| `POST` | `/api/support` | ❌ | Submit a support ticket |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** v9+
- **MongoDB Atlas** cluster (or local MongoDB instance)
- **Cloudinary** account (cloud name, API key, API secret)
- **Resend** API key (for transactional emails)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SubhoSphere/InsightU.git
cd InsightU

# 2. Install backend dependencies
cd backend
npm install

# 3. Configure backend environment
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, Cloudinary & Resend keys

# 4. Generate Prisma Client & push schema
npx prisma generate
npx prisma db push

# 5. Start backend development server
npm run dev
# Server runs at http://localhost:5000

# 6. Install frontend dependencies (new terminal)
cd ../frontend
npm install

# 7. Configure frontend environment
cp .env.local.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL and Cloudinary cloud name

# 8. Start frontend development server
npm run dev
# App runs at http://localhost:3000
```

---

## 🔐 Environment Variables

### Backend (`.env`)
```env
DATABASE_URL=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/insightu
JWT_SECRET=your_super_secret_jwt_key
RESEND_API_KEY=re_xxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=xxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxx
CORS_ORIGIN=http://localhost:3000
PORT=5000
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

---

## 👨‍💻 Developer

<table>
  <tr>
    <td align="center">
      <strong>Subhajit Mandal</strong><br/>
      <em>Full-Stack Developer</em><br/>
      Team CodeSpark<br/><br/>
      <a href="https://github.com/SubhoSphere">GitHub: @SubhoSphere</a><br/>
      <a href="mailto:subhosphere@gmail.com">subhosphere@gmail.com</a>
    </td>
  </tr>
</table>

---

## 📄 License

This project is built for the **Commit Happens** hackathon and is provided under the [MIT License](LICENSE).

---

<p align="center">
  <strong>InsightU</strong> — Bridging the information gap, one verified insight at a time.
</p>
