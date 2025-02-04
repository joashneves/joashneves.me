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
          name="bsky"
          altText="Bluesky Icon"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={
            tamplateConfig.tamplateConfig?.personal?.socialNetworks?.instagram
          }
          name="instagram"
          altText="Intagram Icon"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={tamplateConfig.tamplateConfig?.personal?.socialNetworks?.github}
          name="github"
          altText="github Icon"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={tamplateConfig.tamplateConfig?.personal?.socialNetworks?.coffee}
          name="coffee"
          altText="buy me a coffee Icon"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={
            tamplateConfig.tamplateConfig?.personal?.socialNetworks?.linkedin
          }
          name="linkedin"
          altText="linkedin Icon"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={
            tamplateConfig.tamplateConfig?.personal?.socialNetworks?.discord
          }
          name="discord"
          altText="discord Icon"
          extraClass="custom-class" // Classe extra opcional
        />
      </footer>
    </>
  );
}
