import { getEnv } from "@/utils/common.utils";

export const cloudinary = {
  cloudName: getEnv("NEXT_PUBLIC_REACT_APP_CLOUDINARY_CLOUD_NAME"),
  uploadPreset: getEnv("NEXT_PUBLIC_REACT_APP_CLOUDINARY_UPLOAD_PRESET"),
};
