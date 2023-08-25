import GoogleMapReact from 'google-map-react'
import styles from './regions-map.module.css'
import { useEffect, useState, useRef } from 'react'
import MapNode from './map-node'
import GoogleMap from 'google-maps-react-markers'
const RegionsMap = () => {
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
   //new
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
            <MapNode lat={lat} lng={lng} label={'hello'} />
         </GoogleMap>
      </div>
   )
}

export default RegionsMap
