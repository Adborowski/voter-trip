import styles from './map-node.module.css'

interface MapNodeProps {
   lat: number
   lng: number
   label: string | number
}

const MapNode = (props: MapNodeProps) => {
   const { lat, lng, label } = props

   return (
      <div className={styles.mapNode}>
         <span className={styles.number}>{label}</span>
      </div>
   )
}

export default MapNode
