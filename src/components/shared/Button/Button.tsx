import Image from "next/image";
import { ButtonProps } from "./Button.types";
import { getContainerStyle, getTextStyle } from "./Button.helpers";

const Button = (props: ButtonProps) => {
  const { children, className = "" } = props;
  const { onClick, leftIcon, rightIcon, type = "solid" } = props;
  const { disabled = false } = props;
  const { iconStyle = "", textStyle = "" } = props;

  return (
    <button
      className={`Button ${getContainerStyle(
        type
      )} block transition-all duration-500 ease-in-out ${className} ${
        disabled ? "opacity-30 hover:cursor-not-allowed" : ""
      } `}
      onClick={!disabled ? onClick : () => {}}
    >
      <div className="flex flex-nowrap items-center justify-center">
        {leftIcon ? (
          <Image src={leftIcon} alt="" className={`mr-4 ${iconStyle}`} />
        ) : null}
        <div className={`${getTextStyle(type)} text-center ${textStyle}`}>
          {children}
        </div>
        {rightIcon ? (
          <Image src={rightIcon} alt="" className={`ml-4 ${iconStyle}`} />
        ) : null}
      </div>
    </button>
  );
};

export default Button;
