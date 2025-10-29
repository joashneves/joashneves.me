import styles from "./ProfileNav.module.css";
import HomeIcon from "src/components/icon/svg/home.svg";
import ProjectsIcon from "src/components/icon/svg/projetos.svg";
import ArticlesIcon from "src/components/icon/svg/article.svg";
import LinksIcon from "src/components/icon/svg/links.svg";
import PortifolioIcon from "src/components/icon/svg/portifolio.svg";
import Link from "next/link";

function ProfileNav() {
  {
    return (
      <div className={styles.underlineNav}>
        <nav className={styles.underlineNavBody}>
          <Link
            href="/"
            className={`${styles.underlineNavItem}`}
          >
            <HomeIcon />
            Home
          </Link>
          <Link href="#" className={styles.underlineNavItem}>
            <ProjectsIcon />
            Projetos
          </Link>
          <Link href="#" className={styles.underlineNavItem}>
            <ArticlesIcon />
            Artigos
          </Link>
          <Link href="/portifolio" className={styles.underlineNavItem}>
            <PortifolioIcon />
            Portifolio
          </Link>
          <Link href="#" className={styles.underlineNavItem}>
            <LinksIcon />
            Links
          </Link>
        </nav>
      </div>
    );
  }
}

export default ProfileNav;
