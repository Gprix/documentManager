import { TextType } from "@/components/document/nodes/TextNode/TextNode.types";

export interface Document {
  uid: string;
  title: string;
  authorId: string;
  workspaceId: string;
  documentData: DocumentNodeRawData[];
  documentType: DocumentType;
}

export type DocumentLineRawData = DocumentNodeRawData[];

export type DocumentLineRawDataPosition = {
  rowIndex: number;
  inlineIndex: number;
};

export type InputNodeRawData = TextInputNodeRawData | NumberInputNodeRawData;

export type DocumentNodeRawData =
  | TextBlockNodeRawData
  | TextInputNodeRawData
  | NumberInputNodeRawData
  | TextNodeRawData
  | NodeRawData;

export type NodeTypes = "text" | "textInput" | "numberInput" | "textBlock";

export interface NodeRawData {
  rowIndex: number;
  inlineIndex: number;
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

export type DocumentType = "protocol" | "extra";
