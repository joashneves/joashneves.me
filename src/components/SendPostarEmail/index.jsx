import React,{useState} from "react";
import styles from "./SendPostarEmail.module.css";
import Button from "../Button";

function useForm({ initilValues }) {
  const [values, setValues] = useState(initilValues);

  return {
    values,
    handleChange(evento) {
      const { name, value } = evento.target;
      setValues({
        ...values,
        [name]: value
      })
    }
  }
}

export default function SendPostarEmail(){
  const form = useForm({
    initilValues: {
      email: ""
    }
  })

  return(
    <>
    <form className={styles.emailComponente}>
      <h2>Enviar mensagem no email!</h2>
      <label>
      <textarea 
      className={styles.componenteParaEscrever}
      type="textbox"
      name="email"
      value={form.values.email}
      onChange={form.handleChange}>
      </textarea>
      </label>
      <Button>Enviar!</Button>
    </form> 
    </>
  )
}