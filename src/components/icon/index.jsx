import * as icons from "./svg/_index.jsx";

export default function Icon({ name, size = 24, width = size, height = size, className = "", title }) {
  const IconComponent = icons[name] || icons["links"];
  return (
    <span
      className={`icon ${className}`}
      style={{ width, height }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <IconComponent />
    </span>
  );
}