import api from "./axios";

export const transactionAPI = {
  getTransactions: (params) => api.get("/transaction/list", { params }),
};
