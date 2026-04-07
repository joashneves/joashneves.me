import Icon from "../icon";
import styles from "./Button.module.css";

export default function Button({ children, href, icon, ...props }) {
  const isLink = !!href;
  const isGithub = isLink && href.includes("github.com");

  // Se for link, define o ícone automaticamente (github ou links), 
  // a menos que um ícone específico seja passado via prop.
  const displayIcon = icon || (isGithub ? "github" : isLink ? "links" : null);

  const content = (
    <>
      {displayIcon && <Icon name={displayIcon} width={16} height={16} />}
      {children}
    </>
  );

  if (isLink) {
    return (
      <a
        href={href}
        className={styles.button_style}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={styles.button_style} {...props}>
      {content}
    </button>
  );
}
