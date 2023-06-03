"use client";

import Image from "next/image";
import WavesSVG from "../../public/images/waves.svg";
import DocsSVG from "../../public/images/docs.svg";
import LogoSVG from "../../public/images/logo.svg";
import RightArrowSVG from "../../public/images/icons/right-arrow.svg";
import { Poppins } from "next/font/google";
import Button from "@/components/shared/Button/Button";
import { useRouter } from "next/navigation";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const HomePage = () => {
  const { push } = useRouter();

  return (
    <section className="bg-gradient-to-bl from-[#7F96FF] to-[#000000] relative flex w-full">
      <Image
        src={WavesSVG}
        alt=""
        className="absolute left-0 right-0 bottom-0 w-full pointer-events-none"
      />
      <div className="w-1/2 z-10 flex flex-col justify-center">
        <Image src={DocsSVG} alt="" className="p-16" />
      </div>
      <div className="w-1/2 z-10 p-16 flex flex-col justify-center">
        <Image src={LogoSVG} alt="" />
        <ul className={`${poppins.className} text-white pb-8`}>
          <li className="Home__list-item">
            Accede a tus actas de forma rápida y segura.
          </li>
          <li className="Home__list-item">
            Olvídate de los archivadores y agiliza tus trámites notariales.
          </li>
          <li className="Home__list-item">
            Simplifica tu trabajo con DocuNot®, el gestor documental de procesos
            notariales.
          </li>
        </ul>
        <div className="flex flex-row-reverse">
          {/* // TODO: Cambiar push a /signin */}
          <Button rightIcon={RightArrowSVG} onClick={() => push("/workspace")}>
            Continuar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
