import * as icons from "./svg/_index.jsx";

export default function Icon({ name, width, height }) {
  console.log("icon", icons);
  const CurrentIcon = icons[name] || icons["bksy"];
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
