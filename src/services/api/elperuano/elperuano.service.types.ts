export interface Publication {
  uid: string;
  nodeDocumentId?: string | null;
  fileReference?: string | null;
  status: "pending" | "approved" | "published" | "rejected";
}

export interface PublicationPayload
  extends Omit<Publication, "uid" | "status" | "fileReference"> {
  file?: File;
}
