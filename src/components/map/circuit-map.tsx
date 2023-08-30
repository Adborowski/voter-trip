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
   const [activePolylines, setActivePolylines] = useState<[]>()
   const mapOptions = {
      center: {
         lat: 51.9194,
         lng: 19.1451,
      },
      zoom: 6,
   }

   useEffect(() => {
      console.log('scoredCircuits change', scoredCircuits)
      const polylines: any = []
      const maps = mapsRef.current
      const map = mapRef.current

      // clear previous polylines
      if (activePolylines) {
         activePolylines.forEach((polyline: any) => {
            polyline.setMap(null)
         })
      }

      // create Polyline objects from encoded path from Google Directions API
      scoredCircuits?.forEach((circ) => {
         const encodedPath = circ.route.polyline.points
         const decodedPath = mapsRef.current.geometry.encoding.decodePath(encodedPath)
         const polylineSettings = {
            path: decodedPath,
            geodesic: true,
            strokeColor: 'green',
            strokeOpacity: 0.5,
            strokeWeight: 3,
         }
         const newPolyline = new maps.Polyline(polylineSettings)
         polylines.push(newPolyline)
         newPolyline.setMap(map) // draw the new Polyline
      })

      setActivePolylines(polylines)
   }, [scoredCircuits])

   useEffect(() => {
      console.log('New polylines', activePolylines)
      const maps = mapsRef.current
      const map = mapRef.current
   }, [activePolylines])

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
