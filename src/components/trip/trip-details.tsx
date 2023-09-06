import styles from './trip.module.css'
import { useState, useEffect } from 'react'

interface TripDetailsProps {
   scoredCircuits: ScoredCircuit[]
}

const TripDetails = ({ scoredCircuits }: TripDetailsProps) => {
   const [closestDistricts, setClosestDistricts] = useState<District[]>()

   useEffect(() => {
      setClosestDistricts(scoredCircuits[0].districts)
   }, [scoredCircuits])

   const { score, districts, city_name: destinationCity } = scoredCircuits[0]
   const originCity = scoredCircuits[scoredCircuits.length - 1].city_name

   const redirectToGoogleMaps = (url) => {}

   //    newMarker.addListener('click', (e: Event) => {
   //     console.log('x')
   //     console.log(url)
   //     window.open(url, '_blank')
   //  })

   return (
      <article className={styles.tripDetails}>
         <section className={styles.locations}>
            <span>{originCity}</span>
            <span className={styles.arrow}>🡆</span>
            <span>{destinationCity}</span>
         </section>
         <section className={`${styles.score} ${score > 0 ? styles.good : styles.bad}`}>
            {score}
         </section>
         {score < 0 && (
            <section className={styles.scoreNote}>
               Nie zyskasz dużo robiąc wycieczkę wyborczą. Głosuj u siebie!
            </section>
         )}{' '}
         <h3>Najbliższe powiaty</h3>
         <section className={styles.closestDistricts}>
            {closestDistricts &&
               closestDistricts.map((district: District, index) => {
                  district.district_id = district.district_id.replace('powiat', '')
                  const lat = district.geometry.location.lat
                  const lng = district.geometry.location.lng
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

                  if (index < 3) {
                     return (
                        <section className={styles.closestDistrict} key={district.district_id}>
                           <span>{district.district_id}</span>
                           <span className={styles.distance}>
                              {district.distanceFromOrigin?.toFixed(1)} km
                           </span>
                           <button
                              onClick={() => {
                                 window.open(url, '_blank')
                              }}
                           >
                              Planuj trasę
                           </button>
                        </section>
                     )
                  }
               })}
         </section>
         <div className={styles.explainerWrapper}>
            <span>
               Odległości podane są w linii prostej od lokalnego miasta okręgowego do środka
               powiatu.
            </span>
            <span>Kliknij "Planuj trasę" aby wyznaczyć drogę ze swojej dokładnej lokalizacji.</span>
         </div>
      </article>
   )
}

export default TripDetails
