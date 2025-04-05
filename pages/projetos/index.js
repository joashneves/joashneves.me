import { Card } from "primereact/card";
import styles from "./projetos.module.css";
import { Button } from "primereact/button";
import CardProj from "./CardProj";

function Projetos() {
  return (
    <>
      <h1>Projetos</h1>
      <div className={styles.projetos}>
        <CardProj
         title="Tytpergator"
        subTitle="Uma especie de motor de busca" 
        content="lalalalal" 
        image="https://cdn.discordapp.com/attachments/1197341728588443688/1356464980932952145/20250331_234158.jpg?ex=67f14735&is=67eff5b5&hm=290657357ca07a735798a3e88afa403aa02f53a851198eb9b3f623824c66e774&" 
        alt="imagem"
        linkRepo="https://github.com/joashneves?tab=repositories"
        linkProj="https://typergator.squareweb.app/"/>
        <CardProj
         title="exemplo"
        subTitle="exemplinho" 
        content="o Objetivo principal do projeto é testar minhas habilidades tentando criar meu primeiro projeto web 100% funcional em uma semana, o projeto consiste em um motor de busca que busca por palavras chaves em sites, e retorna os resultados, o projeto ainda esta em desenvolvimento" 
        image="https://cdn.discordapp.com/attachments/1197341728588443688/1356464980932952145/20250331_234158.jpg?ex=67f14735&is=67eff5b5&hm=290657357ca07a735798a3e88afa403aa02f53a851198eb9b3f623824c66e774&" 
        alt="imagem"/>
        <CardProj
         title="exemplo"
        subTitle="exemplinho" 
        content="lalalalal" 
        image="https://cdn.discordapp.com/attachments/1197341728588443688/1356464980932952145/20250331_234158.jpg?ex=67f14735&is=67eff5b5&hm=290657357ca07a735798a3e88afa403aa02f53a851198eb9b3f623824c66e774&" 
        alt="imagem"/>
        <CardProj
         title="exemplo"
        subTitle="exemplinho" 
        content="lalalalal" 
        image="https://cdn.discordapp.com/attachments/1197341728588443688/1356464980932952145/20250331_234158.jpg?ex=67f14735&is=67eff5b5&hm=290657357ca07a735798a3e88afa403aa02f53a851198eb9b3f623824c66e774&" 
        alt="imagem"/>
        <CardProj
         title="exemplo"
        subTitle="exemplinho" 
        content="lalalalal" 
        image="https://cdn.discordapp.com/attachments/1197341728588443688/1356464980932952145/20250331_234158.jpg?ex=67f14735&is=67eff5b5&hm=290657357ca07a735798a3e88afa403aa02f53a851198eb9b3f623824c66e774&" 
        alt="imagem"/>
      </div>
    </>
  );
}

export default Projetos;
