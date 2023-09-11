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

   const { score, city_name: destinationCity, isFavorite } = scoredCircuits[0]
   const originCity = scoredCircuits[scoredCircuits.length - 1].city_name

   return (
      <article className={styles.tripDetails}>
         {isFavorite && <div className={styles.favoriteMarker} />}

         <section className={styles.locations}>
            <span>{originCity}</span>
            <div className={styles.arrow}></div>
            <span>{destinationCity}</span>
         </section>
         <section className={`${styles.score} ${score > 0 ? styles.good : styles.bad}`}>
            {score}
         </section>
         {score < 0 && (
            <section className={styles.scoreNote}>
               <span>Brak korzystnych wycieczek wyborczych.</span>
               <span>Głosuj u siebie.</span>
            </section>
         )}
         <section className={styles.closestDistricts}>
            <h3>Najbliższe powiaty</h3>

            {closestDistricts &&
               closestDistricts.map((district: District, index) => {
                  district.district_id = district.district_id.replace('powiat', '')
                  const lat = district.geometry.location.lat
                  const lng = district.geometry.location.lng
                  // const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
                  const url = `https://www.google.com/maps/search/powiat+${district.district_id}/`

                  if (index < 3) {
                     return (
                        <article className={styles.closestDistrict} key={district.district_id}>
                           <section className={styles.name}>
                              <span>{district.district_id}</span>
                           </section>

                           <section>
                              <span className={styles.distance}>
                                 {district.distanceFromOrigin?.toFixed(0)} km
                              </span>
                           </section>
                           <button
                              onClick={() => {
                                 window.open(url, '_blank')
                              }}
                           >
                              Zobacz powiat
                           </button>
                           {/* <button
                              onClick={() => {
                                 window.open(
                                    `https://www.google.com/search?q=wykaz lokali wyborczych 2023 powiat${district.district_id}`
                                 )
                              }}
                           >
                              Znajdź lokale
                           </button> */}
                        </article>
                     )
                  }
               })}
         </section>
         <div className={styles.explainerWrapper}>
            <span>Odległości w linii prostej od miasta okręgowego do środka powiatu.</span>
            <span>Kliknij PLANUJ TRASĘ aby wyznaczyć drogę ze swojej dokładnej lokalizacji.</span>
            <span>Kliknij ZNAJDŹ LOKALE aby wyszukać lokale wyborcze w danym powiacie.</span>
            <span>Oba przyciski otwierają nową kartę.</span>
         </div>
      </article>
   )
}

export default TripDetails
