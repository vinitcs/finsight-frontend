import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchMonthlyBalance } from "../store/slices/analyticsSlice";

export const useMonthlyBalance = (accountId, year) => {
  const dispatch = useDispatch();
  const { monthlyBalance, monthlyLoading } = useSelector(
    (state) => state.analytics,
  );
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timeout - wait for user to finish selecting year
    debounceTimerRef.current = setTimeout(() => {
      const params = {
        year: year || new Date().getFullYear(),
      }

      // Only add accountId if it's provided (not null for "All Accounts")
      if (accountId) {
        params.accountId = accountId;
      }

      dispatch(fetchMonthlyBalance(params));
    }, 500);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [dispatch, accountId, year]);

  return {
    monthlyBalance,
    loading: monthlyLoading,
  };
};
