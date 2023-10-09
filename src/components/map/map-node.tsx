import styles from './map-node.module.css'
import { useState, useEffect } from 'react'

interface MapNodeProps {
   lat: number
   lng: number
   circuit: Circuit
   circuits: Circuit[] | undefined
   selectCircuit: (circuit: Circuit) => void
   selectedCircuit: Circuit | undefined
   scoredCircuits: any
}

const MapNode = (props: MapNodeProps) => {
   const { selectedCircuit, selectCircuit, circuit, circuits, scoredCircuits } = props
   const { city_name, circuit_number } = circuit

   const [specialClass, setSpecialClass] = useState<any>('')

   useEffect(() => {
      if (!selectedCircuit) {
         setSpecialClass(undefined) // redraw nodes into normal nodes to prevent residual highlighting
      }
      if (circuits && selectedCircuit) {
         scoredCircuits.forEach((listCircuit: any, index: any) => {
            if (listCircuit.city_id == circuit.city_id) {
               if (listCircuit.isDestination) {
                  setSpecialClass(styles.destination)
               }

               if (listCircuit.isTripOrigin) {
                  setSpecialClass(styles.origin)
               }

               if (!listCircuit.isDestination && !listCircuit.isTripOrigin) {
                  setSpecialClass(styles.irrelevant)
               }
            }

            // all-negative trips: mark red only the origin, mark irrelevant to everything else
            if (
               listCircuit.city_id == circuit.city_id &&
               listCircuit.score < 0 &&
               listCircuit.isTripOrigin
            ) {
               setSpecialClass(styles.negative)
            }

            if (
               listCircuit.city_id == circuit.city_id &&
               listCircuit.score < 0 &&
               !listCircuit.isTripOrigin
            ) {
               setSpecialClass(styles.irrelevant)
            }
         })
      }
   }, [selectedCircuit, circuits, scoredCircuits])

   return (
      <section>
         <article
            onClick={() => {
               selectCircuit(circuit)
            }}
            className={`${styles.mapNode} ${specialClass}`}
         >
            <div className={styles.numberWrapper}>
               <span className={styles.number}>{circuit_number}</span>
            </div>
            <div className={styles.textWrapper}>
               <span className={styles.cityLabel}>{city_name}</span>
            </div>
         </article>
         <article>
            {false && (
               <div
                  onClick={() => {
                     window.scrollBy({
                        top: 650,
                        behavior: 'smooth',
                     })
                  }}
                  className={styles.btnViewTrips}
               >
                  <span>Zobacz wycieczkę</span>
               </div>
            )}
         </article>
      </section>
   )
}

export default MapNode
