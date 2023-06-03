import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import { GAccountDropdownProps } from "./GAccountDropdown.types";
import DropdownArrowSVG from "../../../public/images/icons/dropdown-arrow.svg";

const GAccountDropdown = (props: GAccountDropdownProps) => {
  const { className = "" } = props;

  return (
    <div
      className={`GAccountDropdown flex place-items-center justify-center gap-x-6 max-h-20 ${className}`}
    >
      <Image
        src="https://picsum.photos/64"
        alt="NOMBRE DE USUARIO"
        width="64"
        height="64"
        className="rounded-full"
      />
      <div>
        <p className="text-white mb-2">Bienvenido/a</p>
        <Button
          type="outline"
          textStyle="text-white text-lg font-semibold"
          rightIcon={DropdownArrowSVG}
        >
          NOMBRE DE USUARIO
        </Button>
      </div>
    </div>
  );
};

export default GAccountDropdown;
