import styles from './map-node.module.css'

interface MapNodeProps {
   lat: number
   lng: number
   circuit: Circuit
   selectCircuit: (circuit: Circuit) => {}
}

const MapNode = (props: MapNodeProps) => {
   const onClick = (e: any) => {
      props.selectCircuit(props.circuit)
   }
   const { city_name, circuit_number } = props.circuit

   return (
      <div onClick={onClick} className={styles.mapNode}>
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
