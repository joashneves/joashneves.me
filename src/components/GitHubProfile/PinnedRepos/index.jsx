import RepoCard from '../RepoCard';
import styles from './PinnedRepos.module.css';

function PinnedRepos({ pinnedRepos }) {
  return (
    <div className={styles.pinnedContainer}>
      <h2 className={styles.title}>Repositórios</h2>
      <div className={styles.grid}>
        {pinnedRepos?.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default PinnedRepos;
