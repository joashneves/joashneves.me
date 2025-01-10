import React, { useEffect } from "react";
import Markdown from "react-markdown";
import useSWR from "swr";
import rehypeRaw from "rehype-raw";
import styles from "./GitHubReadme.module.css";

// Função fetcher para buscar os dados
const fetcher = (url) =>
  fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao buscar o README");
      }
      return res.json();
    })
    .then((data) => {
      // Decodificando o conteúdo Base64 para UTF-8
      const decodedContent = decodeURIComponent(
        atob(data.content)
          .split("")
          .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
          .join(""),
      );
      return decodedContent;
    });

const GitHubReadme = () => {
  // URL da API do GitHub
  const repoUrl = "https://api.github.com/repos/joashneves/joashneves/readme";

  // Usando SWR para buscar os dados
  const { data: readmeContent, error } = useSWR(repoUrl, fetcher);

  // useEffect para abrir todos os <details>
  useEffect(() => {
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach((details) => {
      details.setAttribute("open", "true");
    });
  }, [readmeContent]);

  if (error) return <p style={{ color: "red" }}>Erro ao carregar o README.</p>;
  if (!readmeContent) return <p>Carregando README...</p>;

  return (
    <div>
      <h1>README do Repositório</h1>
      <Markdown className={styles.readme} rehypePlugins={[rehypeRaw]}>
        {readmeContent}
      </Markdown>
    </div>
  );
};

export default GitHubReadme;
