import axios from "axios";

// Single axios instance. Cookie-based JWT is sent automatically via withCredentials,
// so every role's dashboard uses the same client - only the endpoint prefix differs.
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Session expired / not logged in - let the app-level redirect handle it
    }
    return Promise.reject(err);
  }
);

export default api;
