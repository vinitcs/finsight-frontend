import { useEffect, useRef, useState } from "react";
import { analyticsAPI } from "../api/analytics.api";

export const useAmountRanges = (accountId, startDate, endDate) => {
  const [amountRanges, setAmountRanges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timeout - wait for user to finish selecting dates
    debounceTimerRef.current = setTimeout(() => {
      setLoading(true);
      setError(null);

      const params = {};

      // Only add accountId if it's provided (not null for "All Accounts")
      if (accountId) {
        params.accountId = accountId;
      }

      if (startDate) {
        params.startDate = startDate;
      }

      if (endDate) {
        params.endDate = endDate;
      }

      analyticsAPI
        .getAmountRanges(params)
        .then((response) => {
          if (response.data.success) {
            setAmountRanges(response.data.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch amount ranges");
          setLoading(false);
        });
    }, 500);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [accountId, startDate, endDate]);

  return {
    amountRanges,
    loading,
    error,
  };
};
