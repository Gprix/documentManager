export type Document = "DNI" | "CE";

export type Role = "NOTARIO/A" | "ASISTENCIA NOTARIAL";

export interface Member {
  uid: string;
  name: string;
  email: string;
  documentType: Document;
  documentNumber: string;
  role: Role;
  photoURL: string;
}
