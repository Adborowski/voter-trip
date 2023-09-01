import styles from './map-node.module.css'

interface MapNodeProps {
   lat: number
   lng: number
   circuit: Circuit
   selectCircuit: (circuit: Circuit) => void
   selectedCircuit: Circuit | undefined
   isHighlighted: boolean
}

const MapNode = (props: MapNodeProps) => {
   const { selectedCircuit, selectCircuit, circuit } = props
   const { city_name, circuit_number, isDestination, isTripOrigin } = props.circuit
   let selectedClass

   const highlightedClass = top ? styles.highlighted : ' '
   const destinationClass = isDestination

   // selectedCircuit comes back from above
   if (selectedCircuit === circuit) {
      selectedClass = styles.selectedNode
   }

   return (
      <div
         onClick={() => {
            selectCircuit(circuit)
         }}
         className={`${styles.mapNode} ${selectedClass}`}
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
