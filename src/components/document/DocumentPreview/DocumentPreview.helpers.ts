import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { NodeRawData, NumberInputNodeRawData } from "@/types/document.types";
import { TextBlockNodeRawData } from "@/types/document.types";
import { TextInputNodeRawData } from "@/types/document.types";
import { TextNodeRawData } from "@/types/document.types";

export const nodesDataToTextHelper = (
  nodesData: NodeRawData[],
  selectedDatablocks: DataBlock[]
) => {
  const previewNodes = nodesData;
  return previewNodes
    .map((node) => nodeDataToTextHelper(node, selectedDatablocks))
    .join(" ");
};

export const nodeDataToTextHelper = (
  nodeData: NodeRawData,
  selectedDatablocks: DataBlock[]
): string => {
  const { type } = nodeData;
  let previewData;

  switch (type) {
    case "text":
      previewData = nodeData as TextNodeRawData;
      return previewData.value;

    case "textBlock":
      previewData = nodeData as TextBlockNodeRawData;
      const blockId = previewData.blockEntryId;

      const textBlock = selectedDatablocks.find(
        (datablock) => datablock.uid === blockId
      );

      return textBlock?.value ?? "";

    case "textInput":
      previewData = nodeData as TextInputNodeRawData;
      return previewData.value;

    case "numberInput":
      previewData = nodeData as NumberInputNodeRawData;
      return previewData.value.toString();

    default:
      return "";
  }
};
