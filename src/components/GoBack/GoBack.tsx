"use client";

import { GoBackProps } from "./GoBack.types";
import { useRouter } from "next/navigation";
import LeftArrowSVG from "../../../public/images/icons/left-arrow.svg";
import Image from "next/image";

const GoBack = (props: GoBackProps) => {
  const { label } = props;
  const { back } = useRouter();

  return (
    <div className="flex flex-nowrap place-items-center max-h-6">
      <Image src={LeftArrowSVG} alt="go back" onClick={() => back()} />
      <p className="ml-4 text-lg font-medium">{label}</p>
    </div>
  );
};

export default GoBack;
