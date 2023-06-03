import Image from "next/image";
import logo from "../../public/Logo.png";

export default function NavBar() {
  return (
    //create a standard navbar
    <nav className="bg-[#fcf5f5]">
      <div className="relative flex content-center h-16">
        <div className="relative flex content-center align-center">
          <div className="flex-shrink-0 pl-5">
            <Image
              src={logo}
              width={140}
              alt="logo"
              style={{ backgroundColor: "transparent" }}
            />
          </div>

          <div className="flex items-center">
            <input
              className="bg-[#fcf5f5] text-black rounded-md px-3 py-2 focus:outline-none hover:border-2 hover:border-red-500"
              type="text"
              placeholder="Buscar..."
            />
            <button className="ml-4 bbg-[#fcf5f5] hover:bg-gray-700 text-black rounded-md px-3 py-2 focus:outline-none">
              Buscar
            </button>
          </div>

          <div className="flex content-center align-center">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="#"
                className="text-black hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Inicio
              </a>
              <a
                href="#"
                className="text-black hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Acerca
              </a>
              <a
                href="#"
                className="text-black hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Servicios
              </a>
              <a
                href="#"
                className="text-black hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
