import { EnviarCorreoFunction } from "./email.service.types";
import nodemailer from "nodemailer";

const enviarCorreo: EnviarCorreoFunction = async (opciones) => {
  try {
    const { destinatario, asunto, mensaje, remitente, contraseña } = opciones;

    // Crear el objeto de transporte
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Proveedor de correo electrónico
      port: 465,
      secure: true,
      auth: {
        user: remitente,
        pass: contraseña,
      },
    });

    // Configurar el contenido del correo electrónico
    let correo = {
      from: remitente,
      to: destinatario,
      subject: asunto,
      text: mensaje,
    };

    // Enviar el correo electrónico
    let info = await transporter.sendMail(correo);
    console.log(
      "Correo electrónico enviado correctamente. ID del mensaje:",
      info.messageId
    );
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};

export default enviarCorreo;

// Ejemplo de uso

// import { EmailOptions } from './email.service.types';
// require('dotenv').config();

// const opciones: EmailOptions = {
//   destinatario: "gonzalo.garcia+node@unmsm.edu.pe",
//   asunto: "¡Hola!",
//   mensaje:
//     "Este es un ejemplo de correo electrónico enviado a través de un servicio personalizado.",
//   remitente: "gonzalo.garcia@unmsm.edu.pe",
//   contraseña: process.env.CONTRASENIA,
// };

// enviarCorreo(opciones);
