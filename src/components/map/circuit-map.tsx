import styles from './circuit-map.module.css'
import { useEffect, useState, useRef } from 'react'
import MapNode from './map-node'
import GoogleMap from 'google-maps-react-markers'

interface MapProps {
   circuitList?: Circuit[]
   selectCircuit: (circuit: Circuit) => void
   selectedCircuit?: Circuit
   scoredCircuits?: ScoredCircuit[] // each scoredCircuit has a route property
   tripCount: number
}

const CircuitMap = ({
   circuitList,
   selectCircuit,
   selectedCircuit,
   scoredCircuits,
   tripCount,
}: MapProps) => {
   const mapRef: any = useRef(null)
   const mapsRef: any = useRef(null)
   const [mapReady, setMapReady] = useState(false)
   const [activePolylines, setActivePolylines] = useState<[]>()
   const [mapCircuits, setMapCircuits] = useState<any>(circuitList)
   const polandCenter = { lat: 51.9194, lng: 19.1451 }

   const mapOptions = {
      center: {
         lat: polandCenter.lat,
         lng: polandCenter.lng,
      },
      zoom: 6,
      styles: [
         {
            elementType: 'geometry',
            stylers: [
               {
                  color: '#212121',
               },
            ],
         },
         {
            elementType: 'labels.icon',
            stylers: [
               {
                  visibility: 'off',
               },
            ],
         },
         {
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#757575',
               },
            ],
         },
         {
            elementType: 'labels.text.stroke',
            stylers: [
               {
                  color: '#212121',
               },
            ],
         },
         {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [
               {
                  color: '#757575',
               },
            ],
         },
         {
            featureType: 'administrative.country',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#dadada',
               },
            ],
         },
         {
            featureType: 'administrative.country',
            elementType: 'geometry',
            stylers: [
               {
                  color: '#ffffff',
               },
            ],
         },
         {
            featureType: 'administrative.land_parcel',
            stylers: [
               {
                  visibility: 'off',
               },
            ],
         },
         {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#bdbdbd',
               },
            ],
         },
         {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#757575',
               },
            ],
         },
         {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
               {
                  color: '#181818',
               },
            ],
         },
         {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#616161',
               },
            ],
         },
         {
            featureType: 'poi.park',
            elementType: 'labels.text.stroke',
            stylers: [
               {
                  color: '#1b1b1b',
               },
            ],
         },
         {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
               {
                  color: '#2c2c2c',
               },
            ],
         },
         {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#8a8a8a',
               },
            ],
         },
         {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
               {
                  color: '#373737',
               },
            ],
         },
         {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
               {
                  color: '#3c3c3c',
               },
            ],
         },
         {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
               {
                  color: '#4e4e4e',
               },
            ],
         },
         {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#616161',
               },
            ],
         },
         {
            featureType: 'transit',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#757575',
               },
            ],
         },
         {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
               {
                  color: '#000000',
               },
            ],
         },
         {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
               {
                  color: '#3d3d3d',
               },
            ],
         },
      ],
   }

   useEffect(() => {
      setMapCircuits(circuitList)
      console.log('ok')
   }, [])

   useEffect(() => {
      if (activePolylines) {
         console.log(activePolylines)
      }
   }, [activePolylines])

   useEffect(() => {
      if (scoredCircuits) {
         circuitList = scoredCircuits
         drawPolylines()
         zoomToCircuits(scoredCircuits, tripCount)
         setMapCircuits(scoredCircuits)
      }
   }, [scoredCircuits])

   const zoomToCircuits = (circuits: Circuit[], tripCount: number) => {
      const bounds = new mapsRef.current.LatLngBounds()
      circuits.forEach((circuit, index) => {
         if (index < tripCount) {
            bounds.extend({ lat: circuit.latitude, lng: circuit.longitude })
         }
      })

      mapRef.current.fitBounds(bounds)
   }

   const drawPolylines = () => {
      //
      const polylines: any = []
      const maps = mapsRef.current
      const map = mapRef.current

      // clear previous polylines
      if (activePolylines) {
         activePolylines.forEach((polyline: any) => {
            polyline.setMap(null)
         })
      }

      scoredCircuits?.forEach((circuit, index) => {
         // create Polyline object from encoded path from Google Directions API
         if (index < tripCount) {
            const encodedPath = circuit.route.polyline.points
            const decodedPath = mapsRef.current.geometry.encoding.decodePath(encodedPath)
            const polylineSettings = {
               path: decodedPath,
               geodesic: true,
               strokeColor: 'rgb(255, 208, 0)',
               strokeOpacity: 1,
               strokeWeight: 2,
            }
            const newPolyline = new maps.Polyline(polylineSettings)
            polylines.push(newPolyline)
            newPolyline.setMap(map) // draw the new Polyline
         }
      })

      setActivePolylines(polylines)
   }

   const onGoogleApiLoaded = ({ map, maps }: any) => {
      mapRef.current = map
      mapsRef.current = maps
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
         >
            {circuitList?.map((circuit) => (
               <MapNode
                  key={circuit.circuit_number + circuit.city_name}
                  lat={circuit.latitude}
                  lng={circuit.longitude}
                  circuit={circuit}
                  selectCircuit={selectCircuit}
                  selectedCircuit={selectedCircuit}
                  isHighlighted={false}
               />
            ))}
         </GoogleMap>
      </div>
   )
}

export default CircuitMap
