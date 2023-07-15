export type AppointmentStatus =
  | "pending"
  | "missed"
  | "completed"
  | "in progress"
  | "cancelled";

export interface Appointment {
  uid: string;
  clientName: string;
  date: string;
  time: string;
  description: string;
  assignedTo: string;
  attachmentReference: string;
  status: AppointmentStatus;
}

export interface WriteAppointmentPayload extends Omit<Appointment, "uid"> {}
