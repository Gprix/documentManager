import { DataCaptureWidgetProps } from "./DataCaptureWidget.types";
import LeftArrowAltSVG from "images/icons/left-arrow-alt.svg";
import RightArrowAltSVG from "images/icons/right-arrow-alt.svg";
import Image from "next/image";
import { LinkedNodePreview } from "../LinkedNodePreview/LinkedNodePreview";

export const DataCaptureWidget = (props: DataCaptureWidgetProps) => {
  const { className = "" } = props;

  return (
    <div
      className={`DataCaptureWidget bg-secondaryLight rounded-lg p-2 shadow flex ${className}`}
    >
      <LinkedNodePreview linkedTo="linkedNodeName" />
      <Image src={LeftArrowAltSVG} alt="" />
      <Image src={RightArrowAltSVG} alt="" />
    </div>
  );
};
