import { useEffect, useState, useRef } from 'react'
import CircuitMap from '@/components/map/circuit-map'
import Head from 'next/head'
import Navbar from '@/components/navbar/navbar'
import TripPlanner from '@/components/trip/trip-planner'
import Loading from '@/components/loading/loading'

export default function Map(props: any) {
   const [circuits, setCircuits] = useState<Circuit[]>()
   const [selectedCircuit, setSelectedCircuit] = useState<Circuit | undefined>()
   const [scoredCircuits, setScoredCircuits] = useState<ScoredCircuit[] | undefined>()
   const [mapResetId, setMapResetId] = useState<any>()
   const [mapRef, setMapRef] = useState<any>()
   const [mapsRef, setMapsRef] = useState<any>()
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const tripCount = 1 // how many top trips to show on List and Map (1)

   useEffect(() => {
      fetch('/api/get-circuits')
         .then((res) => res.json())
         .then((circuits) => {
            if (circuits) {
               console.log(circuits)
               setCircuits(circuits)
            }
         })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const selectCircuit = (circuit: Circuit) => {
      console.log('selectCircuit()')
      planTrip(circuit)
   }

   const unselectCircuit = () => {
      setSelectedCircuit(undefined)
      setScoredCircuits(undefined)
   }

   const resetMap = (mapsRef: any, mapRef: any) => {
      const extremePoints = [
         { lat: 53.13, lng: 23.16 },
         { lat: 54.5188898, lng: 18.5 },
         { lat: 53.42, lng: 14.5 },
         { lat: 49.62, lng: 20.7 },
      ]
      const bounds = new mapsRef.current.LatLngBounds()
      if (selectedCircuit) {
         bounds.extend({ lat: selectedCircuit?.latitude, lng: selectedCircuit?.longitude }) // add starter town
      }
      extremePoints.forEach((point) => {
         bounds.extend({ lat: point.lat, lng: point.lng })
      })

      unselectCircuit()

      mapRef.current.fitBounds(bounds)
   }

   const getMapRef = (mapRef: any) => {
      setMapRef(mapRef)
   }

   const getMapsRef = (mapsRef: any) => {
      setMapsRef(mapsRef)
   }

   const planTrip = (circuit: Circuit) => {
      const { city_name } = circuit
      console.log('Planning a trip from', city_name)

      const payload = {
         selectedCircuit: circuit,
         circuits: circuits,
      }

      console.log(payload)
      setIsLoading(true)
      fetch('/api/get-scored-circuits', {
         method: 'POST',
         body: JSON.stringify(payload),
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((res) => res.json())
         .then((scoredCircuits) => {
            if (scoredCircuits) {
               setIsLoading(false)
               console.log('[get-scored-circuits]', scoredCircuits)
               setScoredCircuits(scoredCircuits)
               setSelectedCircuit(
                  scoredCircuits.find((scoredCircuit: ScoredCircuit) => {
                     if (scoredCircuit.city_id == circuit.city_id) {
                        return circuit
                     }
                  })
               )
            }
         })
   }

   return (
      <>
         <Head>
            <title>Vote Tripper</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:title" content="The Rock" />
            <meta property="og:description" content="The Rock description" />
            <meta property="og:type" content="video.movie" />
            <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
            <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
         </Head>

         <Navbar
            mapsRef={mapsRef}
            mapRef={mapRef}
            selectedCircuit={selectedCircuit}
            planTrip={planTrip}
            resetMap={resetMap}
         />

         {isLoading && <Loading />}

         <CircuitMap
            selectedCircuit={selectedCircuit}
            selectCircuit={selectCircuit}
            circuitList={circuits}
            scoredCircuits={scoredCircuits}
            tripCount={tripCount}
            mapResetId={mapResetId}
            getMapRef={getMapRef}
            getMapsRef={getMapsRef}
            resetMap={resetMap}
         />
         {selectedCircuit && scoredCircuits && (
            <TripPlanner
               tripCount={tripCount}
               scoredCircuits={scoredCircuits}
               startCircuit={selectedCircuit}
            />
         )}
      </>
   )
}
