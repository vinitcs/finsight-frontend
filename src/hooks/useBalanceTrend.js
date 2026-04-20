import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchBalanceTrend } from "../store/slices/analyticsSlice";

export const useBalanceTrend = (accountId, months = 20) => {
  const dispatch = useDispatch();
  const { balanceTrend, balanceTrendLoading } = useSelector(
    (state) => state.analytics,
  );
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timeout - wait for user to finish selecting account
    debounceTimerRef.current = setTimeout(() => {
      const params = {
        months: Math.min(months, 20), // Max 20 months
      };

      // Only add accountId if it's provided (not null for "All Accounts")
      if (accountId) {
        params.accountId = accountId;
      }

      dispatch(fetchBalanceTrend(params));
    }, 500);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [dispatch, accountId, months]);

  return {
    balanceTrend,
    loading: balanceTrendLoading,
  };
};
