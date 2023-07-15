import { EmailOptions, EnviarCorreoFunction } from "./email.service.types";
import emailjs from "@emailjs/browser";


const enviarCorreo: EnviarCorreoFunction = async (opciones : EmailOptions) => {


    console.log(opciones)

    emailjs
      .send(
        //@ts-ignore
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE,
        opciones,
        process.env.NEXT_PUBLIC_EMAIL_JS_API
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
};

export default enviarCorreo;

// Ejemplo de uso

// var templateParams = {
//   target: "myg.claudia.03@gmail.com",
//   name: "Sebastian",
//   from_name: "Docunot",
//   message: "This is a test"
// };

// enviarCorreo(templateParams);