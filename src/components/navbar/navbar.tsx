import styles from './navbar.module.css'
import { useRouter } from 'next/router'

interface NavbarProps {
   selectedCircuit: Circuit | undefined
   planTrip: any
   mapRef: any
   mapsRef: any
   resetMap: any
}

const Navbar = (props: NavbarProps) => {
   const { selectedCircuit, planTrip, mapRef, mapsRef, resetMap } = props
   const router = useRouter()

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

   return (
      <div className={styles.navbar}>
         {/* prettier-ignore */}
         {!selectedCircuit && (
            <section className={styles.instructionWrapper}>
               <span>Kliknij na mapie swój lokalny okręg wyborczy</span>
            </section>
         )}

         {selectedCircuit && (
            <section className={styles.controls}>
               <button
                  className={styles.btnBack}
                  onClick={() => {
                     router.push('/')
                  }}
               ></button>
               <button
                  className={styles.btnReset}
                  onClick={() => {
                     resetMap(mapsRef, mapRef)
                  }}
               >
                  <aside className={styles.buttonIcon}></aside>
                  <span>Zacznij od nowa</span>
               </button>
            </section>
         )}
      </div>
   )
}

export default Navbar
