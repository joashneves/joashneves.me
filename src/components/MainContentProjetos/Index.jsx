import { Card } from "primereact/card";
import styles from "./MainContent.module.css";
import { Divider } from "primereact/divider";

export default function MainContentProjetos(props) {
  return (
    <>
      <Card key={props.key} className={styles.card} title={props.title}>
        <p>{props.content}</p>
        <Divider type="dotted" />
      </Card>
    </>
  );
}
