import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import StudentLayout from '../components/layout/StudentLayout';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import BrowseCourses from '../pages/student/BrowseCourses';
import MyLearning from '../pages/student/MyLearning';
import LearningPlayer from '../pages/student/LearningPlayer';
import StudentCalendar from '../pages/student/StudentCalendar';
import StudentMessages from '../pages/student/StudentMessages';
import StudentProgress from '../pages/student/StudentProgress';
import StudentProfile from '../pages/student/StudentProfile';
import StudentSettings from '../pages/student/StudentSettings';
import Certificates from '../pages/student/Certificates';
import { 
  StudentAssignments, 
  StudentAnnouncements, 
  StudentNotifications 
} from '../pages/student/StudentPlaceholders';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect to Student Dashboard */}
      <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
      
      {/* Student Module Routes */}
      <Route element={<StudentLayout />}>
        <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/my-learning" element={<MyLearning />} />
        <Route path="/student/browse" element={<BrowseCourses />} />
        <Route path="/student/player/:courseId" element={<LearningPlayer />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/announcements" element={<StudentAnnouncements />} />
        <Route path="/student/calendar" element={<StudentCalendar />} />
        <Route path="/student/certificates" element={<Certificates />} />
        <Route path="/student/progress" element={<StudentProgress />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/settings" element={<StudentSettings />} />
      </Route>
      
      {/* Catch all fallback */}
      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
