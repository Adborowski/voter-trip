import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface NavbarProps {
   selectedCircuit: Circuit | undefined
   planTrip: any
}

const Navbar = (props: NavbarProps) => {
   const onInstructionClick = () => {
      if (selectedCircuit) {
      }
   }

   console.log('navbar')
   const { selectedCircuit, planTrip } = props
   const router = useRouter()
   const highlightClass = selectedCircuit ? styles.highlight : '0'
   return (
      <div className={`${styles.navbar} ${highlightClass}`}>
         {/* prettier-ignore */}
         <section onClick={onInstructionClick} className={`${styles.instructionWrapper}}`}>
            <span>
               {!selectedCircuit
                  ? 'Kliknij na mapie swój lokalny okręg wyborczy'
                  : 'Zobacz wycieczki'}
            </span>
         </section>
         <section className={styles.controls}>
            <button>
               <span>Reset</span>
            </button>
            <button
               className={styles.btnShowCircuitList}
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
