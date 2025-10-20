import Icon from "src/components/icon";
import { useTemplateConfig } from "src/services/template/TemplateConfigContext";
import styles from "./SocialLinks.module.css";

const SocialLink = ({ name, link }) => {
  if (!link) return null;
  // A simple mapping for display name if needed, otherwise capitalize.
  const displayName = name === 'bsky' ? 'Bluesky' : name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <li className={styles.socialLinkItem}>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
        <Icon name={name} width="16px" height="16px" />
        <span className={styles.linkLabel}>{displayName}</span>
      </a>
    </li>
  );
};

export default function SocialLinks() {
  const { tamplateConfig } = useTemplateConfig();
  const socialNetworks = tamplateConfig?.personal?.socialNetworks || {};

  // Filter out any links that are not defined
  const availableNetworks = Object.entries(socialNetworks).filter(([_, link]) => link);

  if (availableNetworks.length === 0) {
    return null;
  }

  return (
    <ul className={styles.socialLinksContainer}>
      {availableNetworks.map(([name, link]) => (
        <SocialLink key={name} name={name} link={link} />
      ))}
    </ul>
  );
}
