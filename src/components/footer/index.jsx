import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer_module}>
      
      <span>&copy; {new Date().getFullYear()} Joash Neves</span>

    </footer>
  );
}