import styles from './map-node.module.css'
import { useState, useEffect } from 'react'

interface MapNodeProps {
   lat: number
   lng: number
   circuit: Circuit
   circuits: Circuit[] | undefined
   selectCircuit: (circuit: Circuit) => void
   selectedCircuit: Circuit | undefined
   isHighlighted: boolean
}

const MapNode = (props: MapNodeProps) => {
   const { selectedCircuit, selectCircuit, circuit, circuits } = props
   const { city_name, circuit_number, isDestination, isTripOrigin } = circuit
   console.log('%cMapNode render - ' + circuit.city_name, 'color: yellow')

   const [specialClass, setSpecialClass] = useState<any>('')

   useEffect(() => {
      if (circuits) {
         circuits.forEach((listCircuit) => {
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
         })
      }
   }, [selectedCircuit, circuits])

   return (
      <div
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
      </div>
   )
}

export default MapNode
