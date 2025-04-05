import { Card } from "primereact/card";
import styles from "./projetos.module.css";
import { Button } from "primereact/button";

export const header = (image, alt) => {
  return (
    <img
      alt={alt}
      src={image}
      className="card-header-image"
    />
  );
}

export const footer = (linkRepo = "https://github.com/joashneves?tab=repositories", linkProj) => {
  console.log(linkRepo, linkProj)
  
  return (
    <>
      <Button
        label="Github"
        outlined
        onClick={() =>
          window.open(
            `${linkRepo}`,
            "_blank",
          )
        }
      />
      <Button
        label="Projeto"
        outlined
        onClick={() =>
          window.open(`${linkProj}`, "_red")
        }
      />
    </>
  );
};

function CardProj({ title, subTitle, content, image, alt, linkRepo, linkProj }) {

  const headderRes = header(image, alt);
  const footerRes = footer(linkRepo, linkProj);

  return (
    <>

      <div className={styles.projetos}>
        <Card
          title={title}
          subTitle={subTitle}
          header={headderRes}
          footer={footerRes}
          className={`md:w-25rem ${styles.card}`}
        >
          <p className="m-0">
            {content}
          </p>
        </Card>
     
      </div>
    </>
  );
}

export default CardProj;
