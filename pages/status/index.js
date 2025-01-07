import { useState } from "react";
import useSWR from "swr";

async function fetchApi(key) {
    const response = await fetch(key);
    const responsebody = await response.json();
    return responsebody;
}

export default function StatusPage(){
    
    return(
        <>
        <h1>Status</h1>
        <UpdateAt/>
        <ShowAPIStatus/>
        </>
    )
}

function UpdateAt(){
    const {isLoading, data} = useSWR("/api/v1/status", fetchApi, {
        refreshInterval: 2000
    });
    let updateAtText = "..."
    const [nowLoading, setNowLoading] = useState(isLoading);
    if(!isLoading && data){
        updateAtText = new Date(data.updated_at).toLocaleString("pt-BR")
    }

    return <div>Ultima atualização: {updateAtText}</div>
}

function ShowAPIStatus() {
    const { data, isLoading } = useSWR("/api/v1/status", fetchApi, {
      refreshInterval: 2000,
    });
  
    return isLoading ? (
      <div>Carregando...</div>
    ) : (
      <>
        <div>Versão do PostgreSQL: {data.dependencies.database.version}</div>
        <div>Conexões máximas: {data.dependencies.database.max_connections}</div>
        <div>
          Conexões abertas: {data.dependencies.database.openned_connections}
        </div>
      </>
    );
  }