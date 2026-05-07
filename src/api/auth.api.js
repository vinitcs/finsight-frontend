import api from "./axios";

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getCurrentUser: () => api.get("/auth/user"),
  logout: () => api.post("/auth/logout"),
  googleAuth: (idToken) => api.post("/auth/google", { idToken }),
  updatePassword: (data) => api.patch("/auth/password-update", data),
};
