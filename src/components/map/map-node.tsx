import styles from './map-node.module.css'
import { useState, useEffect } from 'react'

interface MapNodeProps {
   lat: number
   lng: number
   circuit: Circuit
   circuits: Circuit[] | undefined
   selectCircuit: (circuit: Circuit) => void
   selectedCircuit: Circuit | undefined
}

const MapNode = (props: MapNodeProps) => {
   const { selectedCircuit, selectCircuit, circuit, circuits } = props
   const { city_name, circuit_number } = circuit

   const [specialClass, setSpecialClass] = useState<any>('')

   useEffect(() => {
      if (!selectedCircuit) {
         setSpecialClass(undefined) // redraw nodes into normal nodes to prevent residual highlighting
      }
      if (circuits && selectedCircuit) {
         circuits.forEach((listCircuit) => {
            if (listCircuit.city_id == circuit.city_id) {
               if (listCircuit.isDestination) {
                  setSpecialClass(styles.destination)
               }

               if (listCircuit.isTripOrigin) {
                  setSpecialClass(styles.origin)
               }

               if (!listCircuit.isDestination && !listCircuit.isTripOrigin) {
                  console.log('IRRELEVANT!')
                  setSpecialClass(styles.irrelevant)
               }
            }
         })
      }
   }, [selectedCircuit, circuits])

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
            {specialClass == styles.origin && (
               <div
                  onClick={() => {
                     window.scrollBy({
                        top: 650,
                        behavior: 'smooth',
                     })
                  }}
                  className={styles.btnViewTrips}
               >
                  <span>Zobacz wycieczki</span>
               </div>
            )}
         </article>
      </section>
   )
}

export default MapNode
