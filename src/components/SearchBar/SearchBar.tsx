import { SearchBarProps } from "./SearchBar.types";

export const SearchBar = (props: SearchBarProps) => {
  const { className = "" } = props;

  return (
    <div
      className={`SearchBar mx-8 py-2 mt-10 border-b border-black ${className}`}
    >
      Buscar...
    </div>
  );
};
