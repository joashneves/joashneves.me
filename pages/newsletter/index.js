import React, { useState } from "react";
import Button from "src/components/Button";

function useForm({initilValues}){
  const [values, setValues] = useState(initilValues);

  return{
    values,
    handleChange(evento){
      const { name, value } = evento.target;
      setValues({
        ...values,
        [name]: value
      })
    }
  }
}
function handleSubmit({evento}){
  evento.preventDefault();
  const form = useForm()
  if(!form.values.email.includes("@")){
    alert("Informe um email valido!")
    return
  }
  console.log("email enviado!",form.values.email)
}

export default function NewsletterScreen(){
  const form = useForm({
    initilValues:{
      email: ""
    }
  })
  return(
    <>
    <article>
      <h1>Envie seu Email</h1>
      <p>Assine a NewsLetter para receber as novidades</p>
      <form onSubmit={handleSubmit}>
      <label>Email
      <input 
      name="email"
      type="email"
      value={form.values.email}
      onChange={form.handleChange}
      ></input>
      </label>
      <Button>Cadastrar</Button>
      </form>
      </article>
      </>
  )
}