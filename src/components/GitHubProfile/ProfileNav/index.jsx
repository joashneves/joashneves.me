import styles from "./ProfileNav.module.css";
import HomeIcon from "src/components/icon/svg/home.svg";
import ProjectsIcon from "src/components/icon/svg/projetos.svg";
import ArticlesIcon from "src/components/icon/svg/article.svg";
import LinksIcon from "src/components/icon/svg/links.svg";
import PortifolioIcon from "src/components/icon/svg/portifolio.svg";

function ProfileNav() {
  {
    return (
      <div className={styles.underlineNav}>
        <nav className={styles.underlineNavBody}>
          <a
            href="/"
            className={`${styles.underlineNavItem} ${styles.selected}`}
          >
            <HomeIcon />
            Home
          </a>
          <a href="#" className={styles.underlineNavItem}>
            <ProjectsIcon />
            Projetos
          </a>
          <a href="#" className={styles.underlineNavItem}>
            <ArticlesIcon />
            Artigos
          </a>
          <a href="/portifolio" className={styles.underlineNavItem}>
            <PortifolioIcon />
            Portifolio
          </a>
          <a href="#" className={styles.underlineNavItem}>
            <LinksIcon />
            Links
          </a>
        </nav>
      </div>
    );
  }
}

export default ProfileNav;
