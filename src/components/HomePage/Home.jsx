import styles from "./Home.module.css";
import UserInfo from "../GitHubProfile/UserInfo";
import PinnedRepos from "../GitHubProfile/PinnedRepos";
import ContributionGraph from "../GitHubProfile/ContributionGraph";
import SocialLinks from "../GitHubProfile/SocialLinks";
import LangUsed from "../LangUsed";

function HomePage({ user, pinnedRepos }) {
  return (
    <div>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <UserInfo user={user} />
          <SocialLinks />
        </aside>
        <main className={styles.mainContent}>
          <PinnedRepos pinnedRepos={pinnedRepos} />
          {user && <ContributionGraph username={user.login} />}
          <LangUsed />
        </main>
      </div>
    </div>
  );
}

export default HomePage;
