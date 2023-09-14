import styles from './trip.module.css'
import { useState, useEffect } from 'react'
import TripLocations from './trip-locations'
import TripScore from './trip-score'
import TripExplainer from './trip-explainer'
import TripDistricts from './trip-districts'
import TripStats from './trip-stats'
import CircuitList from '../circuit/circuit-list'

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

   const origin: ScoredCircuit = scoredCircuits[scoredCircuits.length - 1]
   const originCity = origin.city_name

   return (
      <article className={styles.tripDetails}>
         <TripStats circuit={destination} />

         <TripLocations originCity={originCity} destinationCity={destinationCity} />
         {isFavorite && <div className={styles.favoriteMarker} />}

         <CircuitList circuits={[origin, ...scoredCircuits]} length={2} />
         {/* <TripScore score={score} /> */}
         <TripDistricts districts={closestDistricts} />
         <TripExplainer />
      </article>
   )
}

export default TripDetails
