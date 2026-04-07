import DivSocialFooter from "../DivSocialFooter/DivSocialFooter";
import styles from "./footer.module.css";

// Configuração estática temporária para as redes sociais
const socialNetworks = {
  bsky: "https://bsky.app/profile/joashneves.bsky.social",
  instagram: "https://www.instagram.com/joashneves/",
  github: "https://github.com/joashneves",
  coffee: "https://www.buymeacoffee.com/joashneves",
  linkedin: "https://www.linkedin.com/in/joashneves/",
  discord: "https://discord.gg/Bep9FfD5FG"
};

export default function Footer() {
  return (
    <footer className={styles.footer_module}>
      <DivSocialFooter
        target="_blank"
        link={socialNetworks.bsky}
        name="bsky"
        extraClass="custom-class"
      />
      <DivSocialFooter
        target="_blank"
        link={socialNetworks.instagram}
        name="instagram"
        extraClass="custom-class"
      />
      <DivSocialFooter
        target="_blank"
        link={socialNetworks.github}
        name="github"
        extraClass="custom-class"
      />
      <DivSocialFooter
        target="_blank"
        link={socialNetworks.coffee}
        name="coffee"
        extraClass="custom-class"
      />
      <DivSocialFooter
        target="_blank"
        link={socialNetworks.linkedin}
        name="linkedin"
        extraClass="custom-class"
      />
      <DivSocialFooter
        target="_blank"
        link={socialNetworks.discord}
        name="discord"
        extraClass="custom-class"
      />
    </footer>
  );
}
