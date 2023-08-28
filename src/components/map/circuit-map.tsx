import GoogleMapReact from 'google-map-react'
import styles from './circuit-map.module.css'
import { useEffect, useState, useRef } from 'react'
import MapNode from './map-node'
import GoogleMap from 'google-maps-react-markers'

interface MapProps {
   circuitList: Circuit[] | undefined
}

interface Circuit {
   circuit_number: number
   city_name: string
   mandates: number
   latitude: number
   longitude: number
   residents: number
   residentsPerMandate: number
   swing_factor: number
   votes_ko_2019: number
   votes_pis_2019: number
}

const RegionsMap = ({ circuitList }: MapProps) => {
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
            onChange={(map: any) => console.log('Map moved', map)}
         >
            {circuitList?.map((circuit) => (
               <MapNode
                  lat={circuit.latitude}
                  lng={circuit.longitude}
                  label={circuit.circuit_number}
               />
            ))}
         </GoogleMap>
      </div>
   )
}

export default RegionsMap
