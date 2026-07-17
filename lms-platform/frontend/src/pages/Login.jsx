import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, Button, Input, Alert, Spinner } from "../components/index";
import { authAPI } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("student@lms.local");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/student");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await login(email, password);
      
      // Route based on role
      const role = response.user.role;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "instructor") {
        navigate("/instructor");
      } else if (role === "tutor") {
        navigate("/tutor");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex-center bg-gradient-premium">
      <Card variant="premium" className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">LearnSphere</h1>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Sign up
            </a>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-3">Demo Accounts:</p>
          <div className="space-y-2 text-xs text-slate-600">
            <p>👤 Admin: admin@lms.local / Password123!</p>
            <p>👨‍🏫 Instructor: instructor@lms.local / Password123!</p>
            <p>👨‍🏫 Tutor: tutor@lms.local / Password123!</p>
            <p>👨‍🎓 Student: student@lms.local / Password123!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
