import { writeNotification } from "@/services/notifications/notifications.service";
import { ToastOptions, toast } from "react-toastify";

const options: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
};

export const createInfoNotification = async (
  message: string,
  destination?: string[]
) => {
  toast.info(message, options);
  writeNotification({ type: "info", description: message, destination });
};

export const createSuccessNotification = async (
  message: string,
  destination?: string[]
) => {
  toast.success(message, options);
  writeNotification({ type: "success", description: message, destination });
};

export const createErrorNotification = async (
  message: string,
  destination?: string[]
) => {
  toast.error(message, options);
  writeNotification({ type: "error", description: message, destination });
};

export const createWarningNotification = async (
  message: string,
  destination?: string[]
) => {
  toast.warning(message, options);
  writeNotification({ type: "warning", description: message, destination });
};
