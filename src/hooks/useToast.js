import { useDispatch } from 'react-redux'
import { showToast as showToastAction, hideToast as hideToastAction } from '../store/slices/toastSlice'

export const useToast = () => {
  const dispatch = useDispatch()

  const showToast = (message, type = 'success') => {
    dispatch(showToastAction({ message, type }))
  }

  const hideToast = () => {
    dispatch(hideToastAction())
  }

  return { showToast, hideToast }
}
