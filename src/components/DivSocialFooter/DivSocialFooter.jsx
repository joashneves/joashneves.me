import Image from "next/image";
import styles from "./DivSocialFooter.module.css";

export default function DivSocialFooter(props) {
  const { link, imgSrc, altText, extraClass } = props;

  return (
    <div>
      <a
        target="_blank"
        href={link}
        className={`${styles.socialContainer} ${styles.containerSeven} ${extraClass}`}
      >
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt={altText}
          className={`${styles.socialSvg} ${styles.bsySvg}`}
        />
      </a>
    </div>
  );
}
