import UserInfo from './UserInfo';
import PinnedRepos from './PinnedRepos';
import ContributionGraph from './ContributionGraph';
import styles from './GitHubProfile.module.css';

function GitHubProfile({ user, pinnedRepos }) {
  return (
    <div className={styles.profileContainer}>
      <UserInfo user={user} />
      <PinnedRepos pinnedRepos={pinnedRepos} />
      {user && <ContributionGraph username={user.login} />}
    </div>
  );
}

export default GitHubProfile;
