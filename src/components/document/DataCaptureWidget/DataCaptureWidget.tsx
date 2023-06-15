import { DataCaptureWidgetProps } from "./DataCaptureWidget.types";

export const DataCaptureWidget = (props: DataCaptureWidgetProps) => {
  const { className = "" } = props;

  return <div className={`DataCaptureWidget ${className}`}></div>;
};
