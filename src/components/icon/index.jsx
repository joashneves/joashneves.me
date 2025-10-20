import * as icons from "./svg/_index.jsx";

export default function Icon({ name, width, height }) {
  const CurrentIcon = icons[name] || icons["links"];
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CurrentIcon />
    </svg>
  );
}
