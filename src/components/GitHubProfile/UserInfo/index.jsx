import Image from 'next/image';
import styles from './UserInfo.module.css';

function UserInfo({ user }) {
  if (!user) return null;

  return (
    <div className={styles.userInfo}>
      <Image
        src={user.avatar_url}
        alt={`Avatar de ${user.name}`}
        width={260}
        height={260}
        className={styles.avatar}
      />
      <div className={styles.details}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.login}>{user.login}</p>
        <p className={styles.bio}>{user.bio}</p>
        {/* Adicionar mais informações como seguidores, local, etc. aqui */}
      </div>
    </div>
  );
}

export default UserInfo;
