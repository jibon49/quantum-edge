import { toast } from 'react-toastify';

const useToast = () => {
  const success = (message) => {
    toast.success(message);
  };

  const error = (message) => {
    toast.error(message);
  };

  const info = (message) => {
    toast.info(message);
  };

  const warning = (message) => {
    toast.warning(message);
  };

  const promise = (promiseFunction, messages) => {
    return toast.promise(
      promiseFunction,
      {
        pending: messages.pending || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong!'
      }
    );
  };

  return {
    success,
    error,
    info,
    warning,
    promise
  };
};

export default useToast;
