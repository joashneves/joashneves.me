import styles from "./ComponentTextHome.module.css";

export default function ComponentTextHome(props) {
  return (
    <>
      <div key={props.key} className={styles.componentText}>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
      </div>
    </>
  );
}
