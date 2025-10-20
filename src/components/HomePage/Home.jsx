import styles from "./Home.module.css";
import UserInfo from "../GitHubProfile/UserInfo";
import PinnedRepos from "../GitHubProfile/PinnedRepos";
import ContributionGraph from "../GitHubProfile/ContributionGraph";

function HomePage({ user, pinnedRepos }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <UserInfo user={user} />
      </aside>
      <main className={styles.mainContent}>
        <PinnedRepos pinnedRepos={pinnedRepos} />
        {user && <ContributionGraph username={user.login} />}
      </main>
    </div>
  );
}

export default HomePage;
