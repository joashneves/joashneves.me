import styles from "./DivSocialFooter.module.css";

export default function DivSocialFooter(props) {
  const { link, imgSrc, altText, extraClass } = props;

  return (
    <div>
      <a
        href={link}
        className={`${styles.socialContainer} ${styles.containerSeven} ${extraClass}`}
      >
        <img
          src={imgSrc}
          alt={altText}
          className={`${styles.socialSvg} ${styles.bsySvg}`}
        />
      </a>
    </div>
  );
}
