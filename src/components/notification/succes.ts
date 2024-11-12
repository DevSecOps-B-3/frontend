import { toast } from "react-toastify";

export const successNotification = (message: string, time?: number) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: time ?? 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
