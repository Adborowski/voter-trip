import styles from './navbar.module.css'
import { useRouter } from 'next/router'

const Navbar = () => {
   const router = useRouter()
   return (
      <div className={styles.navbar}>
         <section className={styles.instructionWrapper}>
            <span>Kliknij na mapie swój lokalny okręg wyborczy</span>
         </section>
         <section className={styles.controls}>
            <button
               onClick={() => {
                  router.push('/list')
               }}
            >
               <span>Lista okręgów</span>
            </button>
         </section>
      </div>
   )
}

export default Navbar
