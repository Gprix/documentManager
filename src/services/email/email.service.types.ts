export interface EmailOptions {
  target: string;
  name: string;
  from_name: string;
  message: string;
}

export type EnviarCorreoFunction = (opciones: EmailOptions) => Promise<void>;
