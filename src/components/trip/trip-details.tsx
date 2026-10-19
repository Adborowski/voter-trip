import styles from './trip.module.css'
import { useState, useEffect } from 'react'
import TripLocations from './trip-locations'
import TripScore from './trip-score'
import TripExplainer from './trip-explainer'
import TripDistricts from './trip-districts'
import TripStats from './trip-stats'
import CircuitList from '../circuit/circuit-list'
import SocialPanel from '../social/social-panel'

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
         {isFavorite && <div className={styles.favoriteMarker} />}
         <TripScore score={score} />
         {score > 0 && (
            <>
               <TripLocations originCity={originCity} destinationCity={destinationCity} />
               <TripStats circuit={destination} />
               <CircuitList circuits={[origin, ...scoredCircuits]} length={2} />

               <TripDistricts districts={closestDistricts} />
               <TripExplainer />
            </>
         )}
         <footer className={styles.share}>
            <span className="eyebrow">Udostępnij</span>
            <SocialPanel />
         </footer>
      </article>
   )
}

export default TripDetails
