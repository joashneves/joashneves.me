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
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={
            tamplateConfig.tamplateConfig?.personal?.socialNetworks?.instagram
          }
          name="instagram"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={tamplateConfig.tamplateConfig?.personal?.socialNetworks?.github}
          name="github"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={tamplateConfig.tamplateConfig?.personal?.socialNetworks?.coffee}
          name="coffee"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={
            tamplateConfig.tamplateConfig?.personal?.socialNetworks?.linkedin
          }
          name="linkedin"
          extraClass="custom-class" // Classe extra opcional
        />
        <DivSocialFooter
          target="_blank"
          link={
            tamplateConfig.tamplateConfig?.personal?.socialNetworks?.discord
          }
          name="discord"
          extraClass="custom-class" // Classe extra opcional
        />
      </footer>
    </>
  );
}
