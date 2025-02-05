import styles from "./PostTemplate.module.css";
export default function PostTemplate({ title, metadata, content }) {
  console.log(title, metadata);
  const data = new Date(metadata.date);
  const data_dia = data.getDate();
  const data_mes = data.getMonth();
  const data_ano = data.getFullYear();
  return (
    <div className={styles.postTemplate}>
      <h1>{title}</h1>
      <div className={styles.postDesc}>
        <p>{metadata.excerpt}</p>
        <div>
          <p>{content}</p>
        </div>
        <div>
          <p>
            Data : {data_dia}/{data_mes}/{data_ano}
          </p>
        </div>
      </div>
    </div>
  );
}
