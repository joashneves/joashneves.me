import styles from "./RepoCard.module.css";

// Função auxiliar para a cor da linguagem
const languageColor = (language) => {
  // Cores simples baseadas em linguagens comuns
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
  };
  return colors[language] || "#c9d1d9"; // Cor padrão
};

function RepoCard({ repo }) {
  if (!repo) return null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <h3 className={styles.repoName}>{repo.name}</h3>
      <p className={styles.repoDescription}>{repo.description}</p>
      <div className={styles.repoMeta}>
        {repo.language && (
          <span className={styles.language}>
            <span
              className={styles.languageColor}
              style={{ backgroundColor: languageColor(repo.language) }}
            ></span>
            {repo.language}
          </span>
        )}
        <span>⭐ {repo.stargazers_count}</span>
        <span>☣ {repo.forks_count}</span>
      </div>
    </a>
  );
}

export default RepoCard;
