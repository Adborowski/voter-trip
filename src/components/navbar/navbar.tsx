import styles from './navbar.module.css'
import { useRouter } from 'next/router'

interface NavbarProps {
   selectedCircuit: Circuit | undefined
}

const Navbar = (props: NavbarProps) => {
   const { selectedCircuit } = props
   const router = useRouter()
   return (
      <div className={styles.navbar}>
         <section className={styles.instructionWrapper}>
            <span>
               {!selectedCircuit
                  ? '1. Kliknij na mapie swój lokalny okręg wyborczy'
                  : '2. Kliknij "Zaplanuj wycieczkę" poniżej'}
            </span>
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
