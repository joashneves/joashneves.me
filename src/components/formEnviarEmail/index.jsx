import React, { useState } from "react";
import Button from "src/components/Button";
import styles from "./formEnviarEmail.module.css";

function useForm({ initilValues }) {
  const [values, setValues] = useState(initilValues);

  return {
    values,
    handleChange(evento) {
      const { name, value } = evento.target;
      setValues({
        ...values,
        [name]: value,
      });
    },
  };
}

export default function FormEnviarEmail() {
  const form = useForm({
    initilValues: {
      email: "",
    },
  });

  return (
    <div className={styles.componentEmail}>
      <p>Assine a NewsLetter para receber as novidades</p>
      <form
        className={styles.formEnviarEmail}
        onSubmit={(evento) => {
          evento.preventDefault();
          if (!form.values.email.includes("@")) {
            alert("Informe um email valido!");
            return;
          }
          console.log("email enviado!", form.values.email);

          fetch("/api/v1/newsletter/optin", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(form.values),
          }).then(async (respostaDoServer) => {
            console.log(await respostaDoServer.json());
          });
        }}
      >
        <div>
          <label>
            <h2 className={styles.formEnviarEmail}>Email</h2>
            <input
              className={styles.formEnviarInput}
              name="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
            ></input>
          </label>
        </div>
        <Button>Cadastrar</Button>
      </form>
    </div>
  );
}
