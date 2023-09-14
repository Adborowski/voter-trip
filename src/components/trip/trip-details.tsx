import styles from './trip.module.css'
import { useState, useEffect } from 'react'
import TripLocations from './trip-locations'
import TripScore from './trip-score'
import TripExplainer from './trip-explainer'
import TripDistricts from './trip-districts'
import TripStats from './trip-stats'

interface TripDetailsProps {
   scoredCircuits: ScoredCircuit[]
}

const TripDetails = ({ scoredCircuits }: TripDetailsProps) => {
   const [closestDistricts, setClosestDistricts] = useState<District[]>()

   useEffect(() => {
      setClosestDistricts(scoredCircuits[0].districts)
   }, [scoredCircuits])

   const destination: ScoredCircuit = scoredCircuits[0]
   const { score, city_name: destinationCity, isFavorite } = destination
   const originCity = scoredCircuits[scoredCircuits.length - 1].city_name

   return (
      <article className={styles.tripDetails}>
         {isFavorite && <div className={styles.favoriteMarker} />}
         <TripStats circuit={destination} />
         <TripLocations originCity={originCity} destinationCity={destinationCity} />
         <TripScore score={score} />
         <TripDistricts districts={closestDistricts} />
         <TripExplainer />
      </article>
   )
}

export default TripDetails
