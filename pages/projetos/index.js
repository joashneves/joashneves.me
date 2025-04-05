import { Card } from "primereact/card";
import styles from "./projetos.module.css";
import { Button } from "primereact/button";

const header = () => {
  return (
    <img
      alt="Card"
      src="https://cdn.discordapp.com/attachments/1197340901861756940/1357803566596624434/image.png?ex=67f1889d&is=67f0371d&hm=4bbffacc92eefb19c3f4d0943dd61c8cb24d847684f8dd50e1e0268a79322fb5&"
      className="card-header-image"
    />
  );
}

const footer = () => {
  return (
    <>
      <Button
        label="Github"
        outlined
        onClick={() =>
          window.open(
            "https://github.com/joashneves?tab=repositories",
            "_blank",
          )
        }
      />
      <Button
        label="Projeto"
        outlined
        onClick={() =>
          window.open("https://github.com/joashneves?tab=repositories", "_red")
        }
      />
    </>
  );
};

function Projetos() {
  return (
    <>
      <h1>Projetos</h1>
      <div className={styles.projetos}>
        <Card
          title="Advanced Card"
          subTitle="Card subtitle"
          header={header}
          footer={footer}
          className={`md:w-25rem ${styles.card}`}
        >
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
            adiosdijfw
            Um bot dos discord que faz as parada de joguinho
            e faz tambem um negocio de diverção la 
            e tambem faz aquela coisa la e
            o outro negocio tambem que
            aquilo la que eles faz
          </p>
        </Card>
        <Card
          title="Advanced Card"
          subTitle="Card subtitle"
          header={header}
          footer={footer}
          className={`md:w-25rem ${styles.card}`}
        >
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </Card>
        <Card
          title="Advanced Card"
          subTitle="Card subtitle"
          header={header}
          footer={footer}
          className={`md:w-25rem ${styles.card}`}
        >
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
            adiosdijfw
          </p>
        </Card>
        <Card
          title="Advanced Card"
          subTitle="Card subtitle"
          header={header}
          footer={footer}
          className={`md:w-25rem ${styles.card}`}
        >
          <p className="m-0">
            Um bot dos discord que faz as parada de joguinho
            e faz tambem um negocio de diverção la 
            e tambem faz aquela coisa la e
            o outro negocio tambem que
            aquilo la que eles faz
            Um bot dos discord que faz as parada de joguinho
            e faz tambem um negocio de diverção la 
            e tambem faz aquela coisa la e
            o outro negocio tambem que
            aquilo la que eles faz
          </p>
        </Card>
        
      </div>
    </>
  );
}

export default Projetos;
