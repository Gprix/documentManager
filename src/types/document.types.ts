import { TextType } from "@/components/document/nodes/TextNode/TextNode.types";

export interface Document {
  uid: string;
  title: string;
  workspaceId: string;
  documentData: DocumentRawData | null;
}

export interface DocumentRawData {
  documentLines: DocumentLineRawData[];
}

export type DocumentLineRawData = DocumentNodeRawData[];

export type DocumentNodeRawData =
  | TextBlockNodeRawData
  | TextInputNodeRawData
  | NumberInputNodeRawData
  | TextNodeRawData
  | NodeRawData;

export type NodeTypes = "text" | "textInput" | "numberInput" | "textBlock";

export interface NodeRawData {
  inlineIndex: number;
  rowIndex: number;
  isFullLine: boolean;
  type: NodeTypes;
}

export interface TextBlockNodeRawData extends NodeRawData {
  blockEntryId: string | null;
}

export interface TextInputNodeRawData extends NodeRawData {
  linkedTo: string | null;
  value: string;
}

export interface NumberInputNodeRawData extends NodeRawData {
  linkedTo: string | null;
  value: number;
}

export interface TextNodeRawData extends NodeRawData {
  style: TextType;
  value: string;
}
