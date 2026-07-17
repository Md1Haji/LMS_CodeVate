import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Request Interceptor =====
api.interceptors.request.use(
  (config) => {
    // Add any custom headers or preprocessing here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== Response Interceptor =====
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ===== Authentication Endpoints =====
export const authAPI = {
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),

  login: (email, password) =>
    api.post("/auth/login", { email, password }),

  logout: () =>
    api.post("/auth/logout"),

  getMe: () =>
    api.get("/auth/me"),
};

// ===== Admin Endpoints =====
export const adminAPI = {
  // Dashboard
  getDashboardStats: () =>
    api.get("/admin/dashboard"),

  // Users
  listUsers: (role, search, page = 1, limit = 20) =>
    api.get("/admin/users", { params: { role, search, page, limit } }),

  createUser: (name, email, password, role) =>
    api.post("/admin/users", { name, email, password, role }),

  updateUser: (id, data) =>
    api.patch(`/admin/users/${id}`, data),

  deleteUser: (id) =>
    api.delete(`/admin/users/${id}`),

  // Courses
  listCourses: (status, category, search, page = 1, limit = 20) =>
    api.get("/admin/courses", { params: { status, category, search, page, limit } }),

  updateCourse: (id, data) =>
    api.patch(`/admin/courses/${id}`, data),

  deleteCourse: (id) =>
    api.delete(`/admin/courses/${id}`),

  // Achievements
  listAchievements: () =>
    api.get("/admin/achievements"),

  createAchievement: (data) =>
    api.post("/admin/achievements", data),

  updateAchievement: (id, data) =>
    api.patch(`/admin/achievements/${id}`, data),

  deleteAchievement: (id) =>
    api.delete(`/admin/achievements/${id}`),

  // Reviews
  listReviews: () =>
    api.get("/admin/reviews"),

  deleteReview: (id) =>
    api.delete(`/admin/reviews/${id}`),
};

// ===== Instructor Endpoints (Placeholder) =====
export const instructorAPI = {
  // TODO: Implement instructor endpoints
  getCourses: () =>
    api.get("/instructor/courses"),

  createCourse: (data) =>
    api.post("/instructor/courses", data),
};

// ===== Student Endpoints (Placeholder) =====
export const studentAPI = {
  // TODO: Implement student endpoints
  browseCourses: (category, level, search, page = 1, limit = 12) =>
    api.get("/student/courses", { params: { category, level, search, page, limit } }),

  enrollCourse: (courseId) =>
    api.post(`/student/enroll/${courseId}`),
};

// ===== Tutor Endpoints (Placeholder) =====
export const tutorAPI = {
  // TODO: Implement tutor endpoints
  getAssignedCourses: () =>
    api.get("/tutor/courses"),
};

// ===== Error Handler Utility =====
export const handleApiError = (error) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    "An error occurred. Please try again.";

  return {
    status: error.response?.status,
    message,
    data: error.response?.data,
  };
};

// ===== Loading State Utility =====
export const createApiCall = async (apiFunction, setLoading, setError) => {
  try {
    setLoading(true);
    setError(null);
    const response = await apiFunction();
    return response.data;
  } catch (err) {
    const error = handleApiError(err);
    setError(error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

export default api;
