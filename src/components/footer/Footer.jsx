import DivSocialFooter from "../DivSocialFooter/DivSocialFooter";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer_module}>
        <DivSocialFooter
          link="https://bsky.app/profile/joashneves.me"
          imgSrc="https://raw.githubusercontent.com/joashneves/blog/main/src/assets/Bluesky_Logo.svg"
          altText="Bluesky Icon"
          extraClass="custom-class" // Classe extra opcional
        />
      </footer>
    </>
  );
}
