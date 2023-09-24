import styles from './circuit-map.module.css'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import MapNode from './map-node'
import GoogleMap from 'google-maps-react-markers'

interface MapProps {
   circuitList?: Circuit[]
   selectCircuit: (circuit: Circuit) => void
   selectedCircuit?: Circuit
   scoredCircuits?: ScoredCircuit[] // each scoredCircuit has a route property
   tripCount: number
   mapResetId: number | undefined
   getMapRef: any
   getMapsRef: any
   resetMap: any
}

const CircuitMap = ({
   circuitList,
   selectCircuit,
   selectedCircuit,
   scoredCircuits,
   tripCount,
   mapResetId,
   getMapRef,
   getMapsRef,
   resetMap,
}: MapProps) => {
   const mapRef: any = useRef(null)
   const mapsRef: any = useRef(null)
   const [mapReady, setMapReady] = useState(false)
   const [activePolylines, setActivePolylines] = useState<[]>()
   const [activePoints, setActivePoints] = useState<[]>()
   const [mapCircuits, setMapCircuits] = useState<Circuit[] | undefined>(circuitList)
   const polandCenter = { lat: 51.9194, lng: 19.1451 }
   const router = useRouter()

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

   const districtCount = 1

   useEffect(() => {
      setMapCircuits(circuitList)
   }, [])

   useEffect(() => {
      if (selectedCircuit) {
         console.log('%cNew circuit:', 'color: yellow;', selectedCircuit.city_name)
         window.setTimeout(() => {
            window.scrollBy({
               top: window.innerHeight,
               behavior: 'smooth',
            })
         }, 2000)
      } else {
         console.log('No selectedCircuit')
      }
   }, [selectedCircuit])

   useEffect(() => {
      console.log('%cScored circuits', 'color: lightgreen', scoredCircuits)
      getMapRef(mapRef)
      getMapsRef(mapsRef)
      if (scoredCircuits) {
         drawPolylines()
         drawDistrictPoints()
         zoomToCircuits(scoredCircuits, tripCount)
         setMapCircuits(scoredCircuits)
      } else {
         clearPolylines()
         clearDistrictPoints()
         setMapCircuits(circuitList)
      }
   }, [scoredCircuits])

   const zoomToCircuits = (circuits: Circuit[], tripCount: number) => {
      const bounds = new mapsRef.current.LatLngBounds()
      bounds.extend({ lat: selectedCircuit?.latitude, lng: selectedCircuit?.longitude }) // add starter town
      circuits.forEach((circuit, index) => {
         if (index < tripCount) {
            bounds.extend({ lat: circuit.latitude, lng: circuit.longitude })
         }
      })

      mapRef.current.fitBounds(bounds)
   }

   const clearPolylines = () => {
      if (activePolylines) {
         activePolylines.forEach((polyline: any) => {
            polyline.setMap(null)
         })
      }
   }

   // haversine straight-line formula
   // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
   const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      var R = 6371 // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1) // deg2rad below
      var dLon = deg2rad(lon2 - lon1)
      var a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = R * c // Distance in km
      return d
   }

   // helper for getDistance
   function deg2rad(deg: any) {
      return deg * (Math.PI / 180)
   }

   //  polyline routes
   const drawPolylines = () => {
      //
      const polylines: any = []
      const maps = mapsRef.current
      const map = mapRef.current
      const polylineColors = ['lime', '#ffcf4a', '#d1b66b']
      clearPolylines()

      scoredCircuits?.forEach((circuit, index) => {
         // create Polyline object from encoded path from Google Directions API
         if (index < tripCount) {
            const encodedPath = circuit.route.polyline.points
            const decodedPath = mapsRef.current.geometry.encoding.decodePath(encodedPath)
            const polylineSettings = {
               path: decodedPath,
               geodesic: true,
               strokeColor: polylineColors[index],
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

   const drawDistrictPoints = () => {
      clearDistrictPoints()
      console.log('%cDrawing closest district.', 'color: lightblue')
      const maps = mapsRef.current
      const map = mapRef.current
      let drawnMarkers: any = []

      scoredCircuits?.forEach((circuit, index) => {
         //@ts-ignore
         //add distance from origin to each district so they can be sorted
         circuit.districts = circuit.districts.map((district: District) => {
            const distance = getDistance(
               //@ts-ignore
               selectedCircuit?.latitude,
               selectedCircuit?.longitude,
               district.geometry.location.lat,
               district.geometry.location.lng
            )
            return { ...district, distanceFromOrigin: distance }
         })

         //@ts-ignore
         // sort the districts array
         circuit.districts = circuit.districts.sort((a: any, b: any) => {
            if (a.distanceFromOrigin && b.distanceFromOrigin) {
               return a.distanceFromOrigin - b.distanceFromOrigin
            }
         })

         // only draw district points for tripCount of circuits
         if (index < tripCount && circuit.districts) {
            console.log('%cSorted districts', 'color: pink', circuit.districts)

            circuit.districts.forEach((district: District, index) => {
               if (index < districtCount) {
                  const markerIcon = {
                     url: '/arrow-up.svg',
                     scaledSize: new maps.Size(0, 0),
                  }

                  const markerLabel = {
                     text: district.name,
                     className: styles.markerLabel,
                     fontSize: '11px',
                     color: 'white',
                  }

                  const newMarker = new maps.Marker({
                     position: district.geometry.location,
                     label: markerLabel,
                     icon: markerIcon,
                     clickable: true,
                     map,
                  })

                  drawnMarkers.push(newMarker)
               }
            }) // end of foreach district
            setActivePoints(drawnMarkers)
         } // end of if index
      }) // end of foreach circuit
   }

   const clearDistrictPoints = () => {
      if (activePoints) {
         activePoints.forEach((point: any) => {
            point.setMap(null)
         })
      }
   }

   const getCircuitByNumber = (circuitNumber: number) => {
      //
      console.log('Getting circuit from number', circuitNumber)
      const filteredCircuits: any = circuitList?.filter((circuit) => {
         if (circuit.circuit_number === circuitNumber) {
            console.log('Match', circuit.circuit_number, circuitNumber)
            return true
         }
      })

      if (filteredCircuits.length) {
         return filteredCircuits[0]
      }
   }

   const onGoogleApiLoaded = ({ map, maps }: any) => {
      mapRef.current = map
      mapsRef.current = maps

      if (window.innerWidth > 500) {
         resetMap(mapsRef, mapRef)
      }

      if (router.query.originId) {
         // @ts-ignore
         const id = parseInt(router.query.originId)

         if (getCircuitByNumber(id)) {
            selectCircuit(getCircuitByNumber(id))
         }
      }

      setMapReady(true)
   }

   const key: any = process.env.NEXT_PUBLIC_MAP_KEY

   return (
      <div className={`${styles.mapWrapper} ${selectedCircuit ? styles.trip : ''}`}>
         <GoogleMap
            apiKey={key}
            mapId={'IDb44fccfb0dc0c438'}
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
                  circuits={mapCircuits}
                  selectCircuit={selectCircuit}
                  selectedCircuit={selectedCircuit}
               />
            ))}
         </GoogleMap>
      </div>
   )
}

export default CircuitMap
