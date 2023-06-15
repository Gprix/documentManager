import { Document } from "@/types/document.types";

/**
 * Payload for writing a document to the database
 *
 * @interface WriteDocumentPayload
 */
export interface WriteDocumentPayload
  extends Omit<Document, "uid" | "authorId"> {}
