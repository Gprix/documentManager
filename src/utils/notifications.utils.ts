import { writeNotification } from "@/services/notifications/notifications.service";
import { ToastOptions, toast } from "react-toastify";

<<<<<<< HEAD
<<<<<<< HEAD
import { CONSTANTS } from "@/config/constants";
const { LOG_NOTIFICATIONS } = CONSTANTS.LOGGERS;

=======
>>>>>>> 2c26ece (fix(global): split function newAction())
=======
import { CONSTANTS } from "@/config/constants";
const { LOG_NOTIFICATIONS } = CONSTANTS.LOGGERS;

>>>>>>> ad7f257 (feat(global): add backup service)
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
  LOG_NOTIFICATIONS &&
    writeNotification({ type: "info", description: message, destination });

  writeNotification({ type: "info", description: message, destination });
  LOG_NOTIFICATIONS &&
    writeNotification({ type: "info", description: message, destination });
};

export const createSuccessNotification = async (
  message: string,
  destination?: string[]
) => {
  toast.success(message, options);
  LOG_NOTIFICATIONS &&
    writeNotification({ type: "success", description: message, destination });
};

export const createErrorNotification = async (
  message: string,
  destination?: string[]
) => {
  toast.error(message, options);
  LOG_NOTIFICATIONS &&
    writeNotification({ type: "error", description: message, destination });
};

export const createWarningNotification = async (
  message: string,
  destination?: string[]
) => {
  toast.warning(message, options);
  LOG_NOTIFICATIONS &&
    writeNotification({ type: "warning", description: message, destination });
};
