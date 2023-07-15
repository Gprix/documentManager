import { LinkedNodePreviewProps } from "./LinkedNodePreview.types";

import ChainSVG from "images/icons/chain.svg";
import Image from "next/image";

export const LinkedNodePreview = (props: LinkedNodePreviewProps) => {
  const { className = "", linkedTo } = props;

  return (
    <div
      className={`LinkedNodePreview inline-flex items-center gap-x-2 bg-primaryLight px-3 py-1 rounded-lg m-1 ${className}`}
    >
      <Image src={ChainSVG} alt="" />
      <p className="text-primary text-sm">{linkedTo}</p>
    </div>
  );
};
