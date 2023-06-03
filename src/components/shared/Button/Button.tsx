import Image from "next/image";
import { ButtonProps } from "./Button.types";
import { getContainerStyle, getTextStyle } from "./Button.helpers";

const Button = (props: ButtonProps) => {
  const { children, className = "" } = props;
  const { onClick, leftIcon, rightIcon, type = "solid" } = props;
  const { textStyle = "" } = props;

  return (
    <button
      className={`Button ${getContainerStyle(
        type
      )} block transition-all duration-500 ease-in-out ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-nowrap">
        {leftIcon ? <Image src={leftIcon} alt="" className="mr-4" /> : null}
        <div className={`${getTextStyle(type)} text-center ${textStyle}`}>
          {children}
        </div>
        {rightIcon ? <Image src={rightIcon} alt="" className="ml-4" /> : null}
      </div>
    </button>
  );
};

export default Button;
