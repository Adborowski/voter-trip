import styles from './circuits.module.css'
import { useState, useEffect } from 'react'
import HomeButton from '../navbar/home-button'
import CircuitCard from './circuit-card'

interface CircuitListProps {
   circuits: Circuit[]
   length: number
}

const CircuitList = ({ circuits, length }: CircuitListProps) => {
   return (
      <>
         <article className={styles.circuitList}>
            {circuits &&
               circuits.map((circuit, index) => {
                  if (index < length) {
                     return (
                        <CircuitCard
                           key={circuit.circuit_number + circuit.city_name}
                           circuit={circuit}
                        />
                     )
                  }
               })}
         </article>
      </>
   )
}

export default CircuitList
