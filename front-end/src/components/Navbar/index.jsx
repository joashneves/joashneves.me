import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import gallifreyan from "../../assets/gallifreyan.png";

export default function Navbar() {
  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar_content}>
        <div className={styles.classIcon}>
          <img src={gallifreyan} alt="Gally" style={{ width: '32px', height: '32px' }} />
        </div>
        
        <div className={styles.nav_links}>
          <div className={styles.classIcon}>
            <Link to="/">
              <svg width="24" height="24" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z" fill="#7F5AF0" />
              </svg>
              <div className={styles.legenda}>Inicio</div>
            </Link>
          </div>

          <div className={styles.classIcon}>
            <Link to="/projetos">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C11.45 22 10.9792 21.8042 10.5875 21.4125C10.1958 21.0208 10 20.55 10 20V12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10H20C20.55 10 21.0208 10.1958 21.4125 10.5875C21.8042 10.9792 22 11.45 22 12V20C22 20.55 21.8042 21.0208 21.4125 21.4125C21.0208 21.8042 20.55 22 20 22H12ZM12 20H20V12H12V20ZM6 18V8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6H18V8H8V18H6ZM2 14V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H14V4H4V14H2Z" fill="#7F5AF0" />
              </svg>
              <div className={styles.legenda}>Projetos</div>
            </Link>
          </div>

          <div className={styles.classIcon}>
            <Link to="/links">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H14.5V14.5H4V18ZM16.5 18H20V9H16.5V18ZM4 12.5H14.5V9H4V12.5Z" fill="#7F5AF0" />
              </svg>
              <div className={styles.legenda}>Links</div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
