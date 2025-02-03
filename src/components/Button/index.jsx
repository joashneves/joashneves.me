import styles from './Button.module.css';

export default function Button({children}){
  return(<button className={styles.button_style}>{children}</button>)
}