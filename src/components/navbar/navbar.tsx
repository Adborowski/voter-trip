import styles from './navbar.module.css'
import { useRouter } from 'next/router'

interface NavbarProps {
   selectedCircuit: Circuit | undefined
   planTrip: any
}

const Navbar = (props: NavbarProps) => {
   const { selectedCircuit, planTrip } = props
   const router = useRouter()
   return (
      <div className={styles.navbar}>
         <section className={styles.instructionWrapper}>
            <span>
               {!selectedCircuit
                  ? '1. Kliknij na mapie swój lokalny okręg wyborczy'
                  : '2. Kliknij "Zaplanuj wycieczkę"'}
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
            {selectedCircuit && (
               <button
                  onClick={() => {
                     planTrip(selectedCircuit)
                  }}
                  className={styles.btnPlanTrip}
               >
                  <span>Zaplanuj wycieczkę</span>
               </button>
            )}
         </section>
      </div>
   )
}

export default Navbar
