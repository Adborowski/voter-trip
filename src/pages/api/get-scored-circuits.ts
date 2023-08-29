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
   console.log(tripOrigin.city_id)
   console.log(tripOrigin.swing_factor.toFixed(3))

   const getDistanceFromOrigin = (circuit: Circuit) => {
      const route = routes[tripOrigin.city_id][circuit.city_id]
      return route.distance.value / 1000
   }

   const getCircuitScore = (circuitToScoreAgainst: Circuit) => {
      const circuit = circuitToScoreAgainst
      if (circuit.city_id === 'łodz') {
         circuit.city_id = 'lodz'
      }

      const swingDifference = tripOrigin.swing_factor - circuit.swing_factor
      let swingScore = Math.floor((10 - Math.abs(swingDifference)) * 100)
      // we want swingScore that can be divided by distance in meters (50-100k)
      // lower difference should mean higher score, so we subtract from 10
      // the remainder is multiplied to become similar size number to distance in meters
      // the whole is rounded down for simplicity

      if (circuit.city_id === tripOrigin.city_id) {
         swingScore = 0
      }

      const distanceFromOrigin = getDistanceFromOrigin(circuit)

      const score = swingScore

      console.log('----------------------------------------------------------')
      console.log(`${tripOrigin.city_name} -> ${circuit.city_name}:`)
      console.log(`swingScore ${swingScore}`)
      console.log(`distance ${distanceFromOrigin}`)
      console.log(`score ${score}`)
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
   res.status(200).json(sortedCircuits)
}
