export interface EmailOptions {
  destinatario: string;
  asunto: string;
  mensaje: string;
  remitente: string;
  contraseña: string;
}

export type EnviarCorreoFunction = (opciones: EmailOptions) => Promise<void>;
