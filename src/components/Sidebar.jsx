import styles from './Sidebar.module.css'

import { Avatar } from './Avatar'

import background from '../assets/images/background.jpg'
import lupetImg from '../assets/images/lupet.png'

import {PencilLine} from 'phosphor-react'

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src={background} />

      <div className={styles.profile}>
        <Avatar src={lupetImg} />
        <strong>Lupet Bolota</strong>
        <span>Best dog ever</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={'2.4rem'} />
          Editar seu perfil
        </a>
      </footer>

    </aside>
  )
}
