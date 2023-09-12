import styles from './trip.module.css'
import { useState, useEffect } from 'react'
import TripLocations from './trip-locations'
import TripScore from './trip-score'
import TripExplainer from './trip-explainer'
import TripDistricts from './trip-districts'

interface TripDetailsProps {
   scoredCircuits: ScoredCircuit[]
}

const TripDistrict = ({ district }: any) => {
   const url = `https://www.google.com/maps/search/powiat+${district.district_id}/`
   district.district_id = district.district_id.replace('powiat', '')

   return (
      <article className={styles.closestDistrict} key={district.district_id}>
         <section className={styles.name}>
            <span>{district.district_id}</span>
         </section>

         <section>
            <span className={styles.distance}>{district.distanceFromOrigin?.toFixed(0)} km</span>
         </section>
         <button
            onClick={() => {
               window.open(url, '_blank')
            }}
         >
            Zobacz powiat
         </button>
      </article>
   )
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

         <TripLocations originCity={originCity} destinationCity={destinationCity} />
         <TripScore score={score} />
         <TripDistricts districts={closestDistricts} />
         <TripExplainer />
      </article>
   )
}

export default TripDetails
