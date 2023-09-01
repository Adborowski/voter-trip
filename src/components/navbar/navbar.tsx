import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

interface NavbarProps {
   selectedCircuit: Circuit | undefined
   planTrip: any
   mapRef: any
   mapsRef: any
}

const Navbar = (props: NavbarProps) => {
   const { selectedCircuit, planTrip, mapRef, mapsRef } = props
   const polandCenter = { lat: 51.9194, lng: 19.1451 }

   const resetMap = () => {
      const extremePoints = [
         { lat: 53.13, lng: 23.16 },
         { lat: 54.5188898, lng: 18.5 },
         { lat: 53.42, lng: 14.5 },
         { lat: 49.62, lng: 20.7 },
      ]

      const bounds = new mapsRef.current.LatLngBounds()
      bounds.extend({ lat: selectedCircuit?.latitude, lng: selectedCircuit?.longitude }) // add starter town
      extremePoints.forEach((point, index) => {
         bounds.extend({ lat: point.lat, lng: point.lng })
      })

      mapRef.current.fitBounds(bounds)
   }

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
               <button className={styles.btnUp} onClick={scrollToMap}></button>
               <button className={styles.btnReset} onClick={resetMap}></button>

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
