import { Card } from "primereact/card";
import styles from "./projetos.module.css";
import { Button } from "primereact/button";
import CardProj from "./CardProj";
import { useState } from "react";
import useSWR from "swr";


// Função para buscar dados da API
async function fetchApi(key) {
  const response = await fetch(key);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const responseBody = await response.json();
  console.log("API Response:", responseBody);
  return responseBody;
}


function Projetos() {

  const { data, error, isLoading } = useSWR("/api/v1/projetos", fetchApi);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados: {error.message}</div>;

  console.log(data)
  const projetosData = data;

  return (
    <>
      <h1 className={styles.titleh1}>Projetos</h1>
      <div className={styles.projetos}>
      {projetosData.map((proj,key) => {
          return (
            <CardProj
              key={key}
              title={proj.title}
              subTitle={proj.subTitle}
              content={proj.content}
              image={proj.image}
              alt={proj.alt}
            />
          );
        })}
      </div>
    </>
  );
}

export default Projetos;
