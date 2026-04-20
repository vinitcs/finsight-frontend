import api from "./axios";

export const accountAPI = {
  getUserAccounts: (params) => api.get("/account/detail", { params }),
  addAccount: (data) => api.post("/account/new", data),
  updateAccount: (accountId, data) =>
    api.patch(`/account/update/${accountId}`, data),
  deleteAccount: (id) => api.delete(`/account/delete/${id}`),
  getSettings: () => api.get("/account/settings"),
  updateSettings: (data) => api.put("/account/settings", data),
};
