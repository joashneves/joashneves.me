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
      <form onSubmit={(evento) =>{
        evento.preventDefault();
        if(!form.values.email.includes("@")){
          alert("Informe um email valido!")
          return
        }
        console.log("email enviado!",form.values.email)

        fetch("/api/v1/newsletter/optin", {
          method: "POST",
          headers:{
            "Content-type": "application/json",
          },
          body: JSON.stringify(form.values),
        }).then(async(respostaDoServer)=>{
          console.log(await respostaDoServer.json())
        })
}}>
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