import { Document, NodeRawData } from "@/types/document.types";

/**
 * Template interface
 *
 * @param {string} name - Name of the template
 * @param {NodeRawData[]} templateData - Template data
 * @param {boolean} enabled - Whether the template is enabled
 */
export interface Template extends Omit<Document, "title" | "documentData"> {
  /** Name of the template */
  name: string;
  /** Template data */
  templateData: NodeRawData[];
  /** Whether the template is enabled */
  enabled: boolean;
}

export interface WriteTemplatePayload
  extends Omit<Template, "uid" | "authorId"> {}
