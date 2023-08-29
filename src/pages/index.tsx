import { useEffect, useState } from 'react'
import CircuitMap from '@/components/map/circuit-map'
import Head from 'next/head'
import Navbar from '@/components/navbar/navbar'
import CircuitCard from '@/components/circuit/circuit-card'
import TripPlanner from '@/components/trip/trip-planner'

export default function Home() {
   const [circuits, setCircuits] = useState<Circuit[]>()
   const [selectedCircuit, setSelectedCircuit] = useState<Circuit | undefined>()

   useEffect(() => {
      fetch('/api/get-circuits')
         .then((res) => res.json())
         .then((circuits) => {
            if (circuits) {
               console.log(circuits)
               setCircuits(circuits)
            }
         })
   }, [])

   const selectCircuit = (circuit: Circuit) => {
      setSelectedCircuit(circuit)
   }

   return (
      <>
         <Head>
            <title>Vote Tripper</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <Navbar />

         <CircuitMap
            selectedCircuit={selectedCircuit}
            selectCircuit={selectCircuit} // handler
            circuitList={circuits}
         />
         {selectedCircuit && <TripPlanner startCircuit={selectedCircuit} />}
      </>
   )
}
