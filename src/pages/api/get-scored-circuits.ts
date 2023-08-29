// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var fs = require('fs')
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   const { selectedCircuit, circuits } = req.body
   const dirRelativeToPublicFolder = 'route-list.json'
   const dir = path.resolve('./public', dirRelativeToPublicFolder)
   const routes = JSON.parse(fs.readFileSync(dir))

   const tripOrigin: Circuit = selectedCircuit
   console.log('FROM', tripOrigin.city_id)
   console.log('SWING FACTOR', tripOrigin.swing_factor.toFixed(3))

   const getDistanceFromOrigin = (circuit: Circuit) => {
      const route = routes[tripOrigin.city_id][circuit.city_id]
      return route.distance.value / 1000 // return distance in km
   }

   let swingDifference
   const getSwingDifference = (circuitA: Circuit, circuitB: Circuit) => {
      swingDifference = circuitA.swing_factor - circuitB.swing_factor
      return swingDifference
   }

   const getCircuitScore = (circuitToScoreAgainst: Circuit) => {
      const circuit = circuitToScoreAgainst
      if (circuit.city_id === 'łodz') {
         circuit.city_id = 'lodz'
      }

      const swingDifference = tripOrigin.swing_factor - circuit.swing_factor

      const score = swingDifference
      return score
   }

   const scoredCircuits = circuits.map((circuit: Circuit) => {
      return {
         ...circuit,
         score: getCircuitScore(circuit),
         distance_from_origin: getDistanceFromOrigin(circuit),
      }
   })

   const sortedCircuits = scoredCircuits.sort((a: Circuit, b: Circuit) => {
      if (a.score && b.score) {
         return b.score - a.score
      }
   })

   sortedCircuits.forEach((circuit: Circuit) => {
      console.log(
         `${circuit.city_name}: score ${circuit.score} / distance: ${circuit.distance_from_origin}`,
         `/ swing difference: ${getSwingDifference(tripOrigin, circuit)}`
      )
   })
   res.status(200).json(sortedCircuits)
}
