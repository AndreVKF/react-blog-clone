import styles from './Header.module.css'

import igniteLogo from '../assets/images/Ignite simbol.png'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logotipo do ignite" />
      <h1>Blog Clone</h1>
    </header>
  )
}
