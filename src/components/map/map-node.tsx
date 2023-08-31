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
   const { city_name, circuit_number, top, isTripOrigin } = props.circuit
   let selectedClass

   const highlightedClass = top ? styles.highlighted : ' '

   // selectedCircuit comes back from above
   if (selectedCircuit === circuit) {
      selectedClass = styles.selectedNode
   }

   if (isTripOrigin) {
      console.log('YYYY')
   }

   return (
      <div
         onClick={() => {
            selectCircuit(circuit)
         }}
         className={`${styles.mapNode} ${selectedClass} ${highlightedClass}`}
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
