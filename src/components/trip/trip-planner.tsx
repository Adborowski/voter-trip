import styles from './trip.module.css'
import CircuitList from '../circuit/circuit-list'
import TripDetails from './trip-details'
import { useEffect } from 'react'

interface TripPlannerProps {
   startCircuit: Circuit
   scoredCircuits: Circuit[]
   tripCount: number
   ref?: any
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit, scoredCircuits, tripCount } = props
   const { city_name } = startCircuit

   const finish: Circuit = scoredCircuits[0]
   const start: Circuit = startCircuit

   let tripStats = {
      origin: start.city_name,
      destination: finish.city_name,
      swingDifference: start.swing_factor - finish.swing_factor,
      score: finish.score ? finish.score : -21370,
      districts: finish.districts,
   }

   console.log('tripStats', tripStats)

   return (
      <section className={styles.tripPlanner}>
         <h2>Twoja wycieczka</h2>
         <TripDetails tripStats={tripStats} />
         <CircuitList circuits={scoredCircuits} length={tripCount} />
      </section>
   )
}

export default TripPlanner
