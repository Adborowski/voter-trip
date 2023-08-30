import styles from './circuit-map.module.css'
import { useEffect, useState, useRef } from 'react'
import MapNode from './map-node'
import GoogleMap from 'google-maps-react-markers'

interface MapProps {
   circuitList?: Circuit[]
   selectCircuit: (circuit: Circuit) => void
   selectedCircuit?: Circuit
   scoredCircuits?: ScoredCircuit[] // each scoredCircuit has a route property
}

const CircuitMap = ({ circuitList, selectCircuit, selectedCircuit, scoredCircuits }: MapProps) => {
   const lat = 51.9194
   const lng = 19.1451
   const mapRef: any = useRef(null)
   const mapsRef: any = useRef(null)
   const [mapReady, setMapReady] = useState(false)
   const mapOptions = {
      center: {
         lat: 51.9194,
         lng: 19.1451,
      },
      zoom: 6,
   }

   //  console.log('mapRef', mapRef.current)
   //  console.log('mapsRef', mapsRef.current)

   useEffect(() => {
      console.log('scoredCircuits change', scoredCircuits)
      scoredCircuits?.forEach((circ) => {
         const maps = mapsRef.current
         const map = mapRef.current
         const encodedPath = circ.route.polyline.points
         const decodedPath = mapsRef.current.geometry.encoding.decodePath(encodedPath)

         const polylineObject = {
            path: decodedPath,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
         }
         const newPolyline = new maps.Polyline(polylineObject)
         newPolyline.setMap(map)
      })
   }, [scoredCircuits])

   const onChange = ({ map, maps }: any) => {}

   const onGoogleApiLoaded = ({ map, maps, scoredCircuits }: any) => {
      mapRef.current = map
      mapsRef.current = maps
      setMapReady(true)
   }

   //  console.log(window.google.maps)

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
            onChange={onChange}
            scoredCircuits={scoredCircuits}
         >
            {circuitList?.map((circuit) => (
               <MapNode
                  key={circuit.circuit_number + circuit.city_name}
                  lat={circuit.latitude}
                  lng={circuit.longitude}
                  circuit={circuit}
                  selectCircuit={selectCircuit}
                  selectedCircuit={selectedCircuit}
               />
            ))}
         </GoogleMap>
      </div>
   )
}

export default CircuitMap
