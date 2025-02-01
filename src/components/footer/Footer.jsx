import { useTemplateConfig } from "src/services/template/TemplateConfigContext";
import DivSocialFooter from "../DivSocialFooter/DivSocialFooter";
import styles from "./footer.module.css";

export default function Footer() {
  const tamplateConfig = useTemplateConfig();

  return (
    <>
      <footer className={styles.footer_module}>
        <DivSocialFooter
          target="_blank"
          link={tamplateConfig.tamplateConfig?.personal?.socialNetworks?.bsky}
          imgSrc="https://raw.githubusercontent.com/joashneves/blog/main/src/assets/Bluesky_Logo.svg"
          altText="Bluesky Icon"
          extraClass="custom-class" // Classe extra opcional
        />
      </footer>
    </>
  );
}
