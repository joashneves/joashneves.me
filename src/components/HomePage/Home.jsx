import styles from "./Home.module.css";
import UserInfo from "../GitHubProfile/UserInfo";
import PinnedRepos from "../GitHubProfile/PinnedRepos";
import ContributionGraph from "../GitHubProfile/ContributionGraph";
import ProfileNav from "../GitHubProfile/ProfileNav";

function HomePage({ user, pinnedRepos }) {
  return (
    <div>
      <ProfileNav />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <UserInfo user={user} />
        </aside>
        <main className={styles.mainContent}>
          <PinnedRepos pinnedRepos={pinnedRepos} />
          {user && <ContributionGraph username={user.login} />}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
