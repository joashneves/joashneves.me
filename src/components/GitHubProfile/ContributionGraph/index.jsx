import GitHubCalendar from "react-github-calendar";
import styles from "./ContributionGraph.module.css";

function ContributionGraph({ username }) {
  return (
    <div className={styles.graphContainer}>
      <h2 className={styles.title}>Contribuições no GitHub</h2>
      <GitHubCalendar username={username} />
    </div>
  );
}

export default ContributionGraph;
