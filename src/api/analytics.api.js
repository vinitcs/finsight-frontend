import api from "./axios";

export const analyticsAPI = {
  getSummary: (params) => api.get("/analytics/summary", { params }),
  getYearlyBalance: (params) =>
    api.get("/analytics/yearly-balance", { params }),
  getMonthlyBalance: (params) =>
    api.get("/analytics/monthly-balance", { params }),
  getAmountRanges: (params) =>
    api.get("/analytics/amount-ranges", { params }),
  getTopCredits: (params) =>
    api.get("/analytics/top-credits", { params }),
  getTopDebits: (params) =>
    api.get("/analytics/top-debits", { params }),
  getBalanceTrend: (params) =>
    api.get("/analytics/balance-trend", { params }),
  // getInsights: (params) => api.get("/analytics/insights", { params }),
};
