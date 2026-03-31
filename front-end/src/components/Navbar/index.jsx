import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import Icon from '../icon'

export default function Navbar() {
  const location = useLocation()
  
  // Apenas links públicos. O acesso ao /adm é secreto e manual via URL.
  const menuItems = [
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/projetos', label: 'Projetos', icon: 'projetos' },
    { path: '/links', label: 'Links', icon: 'links' },
    { path: '/post', label: 'Post', icon: 'post' },
  ]

  return (
    <nav className={styles.sidebar}>
      <div className={styles.topIcon}>
        <Icon name="home" width="28" height="28" />
      </div>

      <div className={styles.menuItems}>
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
          >
            <div className={styles.iconWrapper}>
              <Icon name={item.icon} width="22" height="22" />
            </div>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </div>

    </nav>
  )
}
