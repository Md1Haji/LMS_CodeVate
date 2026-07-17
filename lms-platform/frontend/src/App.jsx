import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminOverview from "./pages/admin/AdminOverview.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminCourses from "./pages/admin/AdminCourses.jsx";
import AdminAchievements from "./pages/admin/AdminAchievements.jsx";
import AdminReviews from "./pages/admin/AdminReviews.jsx";
import InstructorDashboard from "./pages/instructor/InstructorDashboard.jsx";
import TutorDashboard from "./pages/tutor/TutorDashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";

export default function App() {
  return (
    <Routes>
      {/* Common, public page - same for every visitor regardless of role */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Role-gated dashboards - each folder above is owned by a different team member */}
      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}
      >
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>
      <Route path="/instructor" element={<ProtectedRoute allowedRoles={["instructor", "admin"]}><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/tutor" element={<ProtectedRoute allowedRoles={["tutor", "admin"]}><TutorDashboard /></ProtectedRoute>} />
      <Route path="/student" element={<ProtectedRoute allowedRoles={["student", "admin"]}><StudentDashboard /></ProtectedRoute>} />
    </Routes>
  );
}
