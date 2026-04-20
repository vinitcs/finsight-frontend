import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAccounts, selectAccount } from "../store/slices/accountSlice";

export const useAccounts = (section = "dashboard") => {
  const dispatch = useDispatch();
  const { accounts, selectedAccounts, loading, error } = useSelector(
    (state) => state.account,
  );
  const selectedAccount = selectedAccounts[section] || null;

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleSelectAccount = (account) => {
    dispatch(selectAccount({ section, account }));
  };

  return {
    accounts,
    selectedAccount,
    loading,
    error,
    selectAccount: handleSelectAccount,
  };
};
