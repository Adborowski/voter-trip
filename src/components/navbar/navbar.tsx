import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

interface NavbarProps {
   selectedCircuit: Circuit | undefined
   planTrip: any
}

const Navbar = (props: NavbarProps) => {
   const { selectedCircuit, planTrip } = props

   const scrollToTrips = () => {
      if (selectedCircuit) {
         window.scrollTo({
            top: 650,
            behavior: 'smooth',
         })
      }
   }

   const scrollToMap = () => {
      if (selectedCircuit) {
         window.scrollTo({
            top: 0,
            behavior: 'smooth',
         })
      }
   }

   const router = useRouter()
   const highlightClass = selectedCircuit ? styles.highlight : '0'
   return (
      <div className={`${styles.navbar} ${highlightClass}`}>
         {/* prettier-ignore */}
         {!selectedCircuit && (
            <section className={styles.instructionWrapper}>
               <span>Kliknij na mapie swój lokalny okręg wyborczy</span>
            </section>
         )}

         {selectedCircuit && (
            <section className={styles.controls}>
               <button className={styles.btnUp} onClick={scrollToMap}></button>
               <button className={styles.btnReset}></button>

               {selectedCircuit && (
                  <button onClick={scrollToTrips}>
                     <span>Zobacz wycieczki</span>
                  </button>
               )}
            </section>
         )}
      </div>
   )
}

export default Navbar
