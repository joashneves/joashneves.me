import styles from "./DivSocialFooter.module.css";
import Icon from "../icon";

export default function DivSocialFooter(props) {
  const { link, name, altText, extraClass } = props;

  return (
    <div className={styles.footer_icon}>
      <a
        target="_blank"
        href={link}
        className={`${styles.socialContainer} ${styles.socialSvg} ${styles.containerSeven} ${extraClass}`}
      >
        <Icon name={name} width="52px" height="52px" />
      </a>
    </div>
  );
}
