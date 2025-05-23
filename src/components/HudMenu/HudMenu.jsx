import styles from "./HudMenu.module.css";
import Link from "next/link";
import Image from "next/image";
import gallifreyan from 'src/assets/gallifreyan.png';
import { Divider } from "primereact/divider";
export default function HudMenu() {
  return (
    <>
      {/* Renderiza o SideMenu apenas se o estado for verdadeiro */}
      <div className={styles.button_div_hud}>
        <div className={styles.classIcon}>
            <Image src={gallifreyan} alt="Gally"/>
        </div>
        <Divider/>
        <div className={styles.classIcon}>
          <Link href="/" onMouseEnter={() => console.log("Entrou")}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z"
                fill="#7F5AF0"
              />
            </svg>
            <div className={styles.legenda}>Inicio</div>
          </Link>
        </div>
        <div className={styles.classIcon}>
          <Link href="/projetos">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C11.45 22 10.9792 21.8042 10.5875 21.4125C10.1958 21.0208 10 20.55 10 20V12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10H20C20.55 10 21.0208 10.1958 21.4125 10.5875C21.8042 10.9792 22 11.45 22 12V20C22 20.55 21.8042 21.0208 21.4125 21.4125C21.0208 21.8042 20.55 22 20 22H12ZM12 20H20V12H12V20ZM6 18V8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6H18V8H8V18H6ZM2 14V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H14V4H4V14H2Z"
                fill="#7F5AF0"
              />
            </svg>
            <div className={styles.legenda}>Projetos</div>
          </Link>
        </div>
        {/* <div className={styles.classIcon}>
          <Link href="/newsletter">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H14.5V14.5H4V18ZM16.5 18H20V9H16.5V18ZM4 12.5H14.5V9H4V12.5Z"
                fill="#7F5AF0"
              />
            </svg>
            <div className={styles.legenda}>Newsletter</div>
          </Link>
        </div>
        <div className={styles.classIcon}>
          <Link href="/posts">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00001 20V8.97501C7.00001 8.42501 7.20001 7.95835 7.60001 7.57501C8.00001 7.19168 8.47501 7.00001 9.02501 7.00001H20C20.55 7.00001 21.0208 7.19585 21.4125 7.58751C21.8042 7.97918 22 8.45001 22 9.00001V17L17 22H9.00001C8.45001 22 7.97918 21.8042 7.58751 21.4125C7.19585 21.0208 7.00001 20.55 7.00001 20ZM2.02501 6.25001C1.92501 5.70001 2.03335 5.20418 2.35001 4.76251C2.66668 4.32085 3.10001 4.05001 3.65001 3.95001L14.5 2.02501C15.05 1.92501 15.5458 2.03335 15.9875 2.35001C16.4292 2.66668 16.7 3.10001 16.8 3.65001L17.05 5.00001H15L14.825 4.00001L4.00001 5.92501L5.00001 11.575V18.55C4.73335 18.4 4.50418 18.2 4.31251 17.95C4.12085 17.7 4.00001 17.4167 3.95001 17.1L2.02501 6.25001ZM9.00001 9.00001V20H16V16H20V9.00001H9.00001Z"
                fill="#7F5AF0"
              />
            </svg>
            <div className={styles.legenda}>Posts</div> 
            </Link>
        </div>*/}
        <div className={styles.classIcon}>
          <Link href="/social">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V20H4ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                fill="#7F5AF0"
              />
            </svg>
            <div className={styles.legenda}>Sobre</div>
          </Link>
        </div>
      </div>
    </>
  );
}
