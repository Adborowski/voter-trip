import { useEffect, useState } from 'react'

import CircuitMap from '@/components/map/circuit-map'
import CircuitList from '@/components/circuit-list'
import Head from 'next/head'

export default function Home() {
   const [circuits, setCircuits] = useState<Circuit[]>()

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

   return (
      <>
         <Head>
            <title>Vote Tripper</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <CircuitMap circuitList={circuits} />
      </>
   )
}
