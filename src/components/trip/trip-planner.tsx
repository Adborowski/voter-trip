import styles from './trip.module.css'
import CircuitList from '../circuit/circuit-list'
import TripDetails from './trip-details'
import { useEffect, useState } from 'react'

interface TripPlannerProps {
   startCircuit: Circuit
   scoredCircuits: ScoredCircuit[]
   tripCount: number
   ref?: any
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit, scoredCircuits, tripCount } = props

   return (
      <section className={styles.tripPlanner}>
         <h2
            onClick={() => {
               window.scrollBy({
                  top: 650,
                  behavior: 'smooth',
               })
            }}
         >
            Twoja wycieczka
         </h2>
         <TripDetails scoredCircuits={scoredCircuits} />
      </section>
   )
}

export default TripPlanner
