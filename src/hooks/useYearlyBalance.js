import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchYearlyBalance } from "../store/slices/analyticsSlice";

export const useYearlyBalance = (accountId, startYear, endYear) => {
  const dispatch = useDispatch();
  const { yearlyBalance, yearlyLoading } = useSelector(
    (state) => state.analytics,
  );
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only trigger debounce if startYear is selected
    if (!startYear) return;

    // Set new timeout - wait 2 seconds before making the API call
    // This gives user time to select endYear after selecting startYear
    debounceTimerRef.current = setTimeout(() => {
      const params = {};
      if (accountId) params.accountId = accountId;
      params.startYear = startYear;
      if (endYear) params.endYear = endYear;

      dispatch(fetchYearlyBalance(params));
    }, 2000);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [dispatch, accountId, startYear, endYear]);

  return {
    yearlyBalance,
    loading: yearlyLoading,
  };
};
