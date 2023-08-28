import GoogleMapReact from 'google-map-react'
import styles from './circuit-map.module.css'
import { useEffect, useState, useRef } from 'react'
import MapNode from './map-node'
import GoogleMap from 'google-maps-react-markers'

interface MapProps {
   circuitList: Circuit[] | undefined
   selectCircuit: (circuit: Circuit) => {}
}

const RegionsMap = ({ circuitList, selectCircuit }: MapProps) => {
   const lat = 51.9194
   const lng = 19.1451
   const mapRef: any = useRef(null)
   const [mapReady, setMapReady] = useState(false)
   const mapOptions = {
      center: {
         lat: 51.9194,
         lng: 19.1451,
      },
      zoom: 6,
   }

   const onGoogleApiLoaded = ({ map, maps }: any) => {
      mapRef.current = map
      setMapReady(true)
   }

   const key: any = process.env.NEXT_PUBLIC_MAP_KEY

   return (
      <div className={styles.mapWrapper}>
         <GoogleMap
            className={styles.map}
            apiKey={key}
            defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
            defaultZoom={5}
            options={mapOptions}
            onGoogleApiLoaded={onGoogleApiLoaded}
            onChange={(map: any) => console.log('Map changed')}
         >
            {circuitList?.map((circuit) => (
               <MapNode
                  key={circuit.circuit_number + circuit.city_name}
                  lat={circuit.latitude}
                  lng={circuit.longitude}
                  circuit={circuit}
                  selectCircuit={selectCircuit}
               />
            ))}
         </GoogleMap>
      </div>
   )
}

export default RegionsMap
