import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSummary } from "../store/slices/analyticsSlice";

export const useSummary = (accountId, startDate, endDate) => {
  const dispatch = useDispatch();
  const { summary, summaryLoading, summaryError } = useSelector(
    (state) => state.analytics,
  );

  useEffect(() => {
    const params = {};
    if (accountId) params.accountId = accountId;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    dispatch(fetchSummary(params));
  }, [dispatch, accountId, startDate, endDate]);

  return {
    summary,
    loading: summaryLoading,
    error: summaryError,
  };
};
