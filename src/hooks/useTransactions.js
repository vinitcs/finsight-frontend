import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import {
  fetchTransactions,
  setPagination,
} from "../store/slices/transactionSlice";
import { PAGINATION_DEFAULTS } from "../utils/constants";

export const useTransactions = (accountId) => {
  const dispatch = useDispatch();
  const { transactions, pagination, loading, error } = useSelector(
    (state) => state.transaction,
  );

  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      accountId: accountId || "",
    };

    dispatch(fetchTransactions(params));
  }, [dispatch, accountId, pagination.page, pagination.limit]);

  const handleSetPagination = useCallback(
    (newPagination) => {
      dispatch(setPagination(newPagination));
    },
    [dispatch],
  );

  return {
    transactions,
    pagination,
    loading,
    error,
    setPagination: handleSetPagination,
  };
};
