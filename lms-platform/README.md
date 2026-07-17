# LearnSphere — LMS Platform

A role-based Learning Management System: one shared public landing page, one
authentication system, and four purpose-built dashboards (Admin, Instructor,
Tutor, Student).

**Stack:** React (Vite) frontend · Node.js/Express backend · MongoDB (Mongoose) · JWT auth in httpOnly cookies.

---

## 1. Architecture

```
lms-platform/
├── backend/
│   └── src/
│       ├── config/db.js           MongoDB connection
│       ├── models/                Mongoose schemas (shared by everyone)
│       ├── middleware/
│       │   ├── auth.js            protect() — verifies JWT, loads req.user
│       │   └── authorize.js       authorize("role", ...) — role gate
│       └── modules/                <- one folder per team member
│           ├── auth/               common login/register/logout for ALL roles
│           ├── admin/              admin dashboard + user provisioning
│           ├── instructor/         course authoring, grading, roster
│           ├── tutor/              assigned-course support & feedback
│           └── student/            browse, enroll, submit, review
└── frontend/
    └── src/
        ├── context/AuthContext.jsx     shared session state (all roles)
        ├── components/                 Navbar, ProtectedRoute, landing widgets
        ├── pages/
        │   ├── LandingPage.jsx         PUBLIC — features + achievements, same for everyone
        │   ├── Login.jsx / Register.jsx
        │   ├── admin/AdminDashboard.jsx
        │   ├── instructor/InstructorDashboard.jsx
        │   ├── tutor/TutorDashboard.jsx
        │   └── student/StudentDashboard.jsx
```

**Why this shape:** authentication is common infrastructure everyone depends
on, so it lives in its own module (`modules/auth`) rather than inside any one
role's folder. Authorization is a single reusable middleware
(`authorize("admin")`, `authorize("instructor","admin")`, etc.) applied per
route — this is how real companies keep four teams shipping in parallel
without stepping on each other's code, and how a security review can audit
permissions in one place instead of four.

## 2. Suggested team split (4 people)

| Owner | Folder(s) | Responsibility |
|---|---|---|
| **You** | `backend/src/modules/auth`, `backend/src/modules/admin`, `frontend/src/pages/admin`, `frontend/src/context`, `frontend/src/middleware`/`ProtectedRoute` | Authentication, authorization middleware, admin dashboard, user provisioning |
| Teammate 2 | `backend/src/modules/instructor`, `frontend/src/pages/instructor` | Course authoring, assignments, grading, tutor assignment |
| Teammate 3 | `backend/src/modules/tutor`, `frontend/src/pages/tutor` | Assigned-course view, submission feedback |
| Teammate 4 | `backend/src/modules/student`, `frontend/src/pages/student` | Course browsing, enrollment, submissions, reviews |
| Shared | `frontend/src/pages/LandingPage.jsx`, `backend/src/models/` | Public landing page and DB schema — touch via PR review since everyone depends on these |

Each module folder is self-contained (its own `*.controller.js` +
`*.routes.js`), so merge conflicts stay rare even with four people working at
once. `server.js` only imports and mounts each module's router.

## 3. Auth & authorization flow

1. `POST /api/auth/register` — public sign-up, always creates a `student`.
2. `POST /api/auth/login` — common login for every role; returns the user's
   `role`, and the frontend redirects to `/admin`, `/instructor`, `/tutor`,
   or `/student` accordingly.
3. Every protected API route runs `protect` (verifies the JWT cookie, loads
   `req.user`) then `authorize(...)` (checks `req.user.role` against an
   allow-list).
4. On the frontend, `<ProtectedRoute allowedRoles={[...]}>` mirrors the same
   check so a student can't even load the admin dashboard's JS.
5. Instructor/tutor/admin accounts are **not** self-service — they're
   provisioned by an admin via `POST /api/admin/users`, so the public
   register form can't be used to grant teaching/admin permissions.

## 4. Setup

```bash
# Backend
cd backend
cp .env.example .env      # set MONGO_URI and JWT_SECRET
npm install
npm run seed               # creates one demo account per role
npm run dev                 # http://localhost:5000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev                 # http://localhost:5173
```

Demo accounts after `npm run seed` (password `Password123!` for all):
`admin@lms.local`, `instructor@lms.local`, `tutor@lms.local`, `student@lms.local`.

See `DB_SCHEMA.md` for the MongoDB collection design.
