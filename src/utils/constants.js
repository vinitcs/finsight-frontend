export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 10,
};

export const TRANSACTION_TYPES = {
  DEBIT: "DEBIT",
  CREDIT: "CREDIT",
};

export const UPLOAD_STATUS = {
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};

export const CURRENCY = "INR";
export const TIMEZONE = "Asia/Kolkata";

export const BANK_NAMES = [
  // "SBI",
  // "HDFC",
  // "ICICI",
  // "Axis",
  // "Kotak",
  // "Yes Bank",
  // "IDBI",
  // "BOI",
  // "PNB",
  // "Union Bank",
  "BOB",
  "CBI",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
  TRANSACTIONS: "/transactions",
  UPLOAD: "/upload",
  ANALYTICS: "/analytics",
  ACCOUNT: "/accounts",
};
