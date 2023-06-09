import { ButtonType } from "./Button.types";

export const getContainerStyle = (type: ButtonType) =>
  ({
    solid: "bg-[#FF4D84] hover:bg-[#FF71A5] rounded-2xl p-4",
    outline: "",
    transparent: "",
  }[type]);

export const getTextStyle = (type: ButtonType) =>
  ({
    solid: "text-white font-semibold",
    outline: "text-black underline font-medium",
    transparent: "text-black",
  }[type]);
