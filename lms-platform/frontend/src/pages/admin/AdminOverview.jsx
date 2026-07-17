import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { adminAPI } from "../services/api";
import { Card, Spinner, Alert } from "./index";

const AdminOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminAPI.getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="error" title="Error">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="premium">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">
              {stats?.totalStudents || 0}
            </div>
            <p className="text-slate-600 mt-2">Total Students</p>
          </div>
        </Card>

        <Card variant="premium">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">
              {stats?.totalInstructors || 0}
            </div>
            <p className="text-slate-600 mt-2">Instructors</p>
          </div>
        </Card>

        <Card variant="premium">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">
              {stats?.publishedCourses || 0}
            </div>
            <p className="text-slate-600 mt-2">Published Courses</p>
          </div>
        </Card>

        <Card variant="premium">
          <div className="text-center">
            <div className="text-4xl font-bold text-success-600">
              ${stats?.estimatedRevenue || 0}
            </div>
            <p className="text-slate-600 mt-2">Revenue</p>
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Platform Overview</h3>
          <div className="space-y-3">
            <div className="flex-between">
              <span className="text-slate-700">Total Courses</span>
              <span className="font-semibold text-slate-900">{stats?.totalCourses}</span>
            </div>
            <div className="flex-between">
              <span className="text-slate-700">Draft Courses</span>
              <span className="font-semibold text-slate-900">{stats?.draftCourses}</span>
            </div>
            <div className="flex-between">
              <span className="text-slate-700">Total Enrollments</span>
              <span className="font-semibold text-slate-900">{stats?.totalEnrollments}</span>
            </div>
            <div className="flex-between">
              <span className="text-slate-700">Active Enrollments</span>
              <span className="font-semibold text-slate-900">{stats?.activeEnrollments}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {stats?.recentUsers?.map((u) => (
              <div key={u._id} className="flex-between pb-3 border-b border-slate-200 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{u.name}</p>
                  <p className="text-sm text-slate-500">{u.email}</p>
                </div>
                <span className="badge badge-slate text-xs">{u.role}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
