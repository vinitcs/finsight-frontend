import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUploads, setPagination } from "../store/slices/uploadSlice";
import { PAGINATION_DEFAULTS } from "../utils/constants";

export const useUpload = () => {
  const dispatch = useDispatch();

  const { uploads, pagination, loading, error } = useSelector(
    (state) => state.upload,
  );

  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
    };
    dispatch(fetchUploads(params));
  }, [dispatch, pagination.page, pagination.limit]);

  const handleSetPagination = useCallback(
    (newPagination) => {
      dispatch(setPagination(newPagination));
    },
    [dispatch],
  );

  return {
    uploads,
    pagination,
    loading,
    error,
    setPagination: handleSetPagination,
  };
};
