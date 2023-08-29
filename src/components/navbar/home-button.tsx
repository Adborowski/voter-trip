import { useRouter } from 'next/router'
import styles from './navbar.module.css'

// standalone home button on a bar
// moves layout

const HomeButton = () => {
   const router = useRouter()
   return (
      <div className={styles.homeButtonBar}>
         <button
            onClick={() => {
               router.push('/')
            }}
         ></button>
      </div>
   )
}

export default HomeButton
