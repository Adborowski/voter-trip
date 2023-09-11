// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var fs = require('fs')
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   const { selectedCircuit, circuits } = req.body
   const dirRelativeToPublicFolder = 'route-list.json'
   const dir = path.resolve('./public', dirRelativeToPublicFolder)
   const routes = JSON.parse(fs.readFileSync(dir))
   const tripCount = 1 // gotta mirror the tripCount in the frontend; used for marking map

   const tripOrigin: Circuit = selectedCircuit
   console.log('FROM', tripOrigin.city_id)
   console.log('SWING FACTOR', tripOrigin.swing_factor.toFixed(3))

   const getDistanceFromOrigin = (circuit: Circuit) => {
      if (tripOrigin.city_id === 'lodz') {
         tripOrigin.city_id = 'łodz'
      }

      if (circuit.city_id === 'lodz') {
         circuit.city_id = 'łodz'
      }

      // console.log(`[${tripOrigin.city_id}][${circuit.city_id}]`)
      const route = routes[tripOrigin.city_id][circuit.city_id]
      if (!route) {
         console.log('No route from', tripOrigin.city_id, 'to', circuit.city_id)
      }

      // in case of a route from X to itself, make distance massive
      if (route.distance.value < 5) {
         return 1000000
      }
      return Math.round(route.distance.value / 1000) // return distance in km
   }

   const getRouteFromOrigin = (circuit: Circuit) => {
      const route = routes[tripOrigin.city_id][circuit.city_id]
      return route
   }

   const getSwingDifference = (circuitA: Circuit, circuitB: Circuit) => {
      let swingDifference = circuitA.swing_factor - circuitB.swing_factor
      return swingDifference
   }

   const getCircuitScore = (circuitToScoreAgainst: Circuit) => {
      const circuit = circuitToScoreAgainst
      if (circuit.city_id === 'łodz') {
         circuit.city_id = 'lodz'
      }

      // negative swingDifference means you gain SF by voting at the circuit
      const swingDifference = tripOrigin.swing_factor - circuit.swing_factor

      // user's goal is to maximize SF decrease, while staying within reasonable distance

      const distanceWeight = 1.5 // math weight of distance ie how much should distance impact the score
      let score =
         Math.floor(swingDifference * 1000) - getDistanceFromOrigin(circuit) * distanceWeight

      return score
   }

   const scoredCircuits = circuits.map((circuit: Circuit) => {
      return {
         ...circuit,
         score: getCircuitScore(circuit),
         distance_from_origin: getDistanceFromOrigin(circuit),
         route: getRouteFromOrigin(circuit),
      }
   })

   let sortedCircuits = scoredCircuits.sort((a: Circuit, b: Circuit) => {
      if (a.score && b.score) {
         return b.score - a.score
      }
   })

   // mark the objects as isTripOrigin or isDestination, for use in map nodes
   sortedCircuits = sortedCircuits.map((sortedCircuit: ScoredCircuit, index: number) => {
      if (selectedCircuit.city_id === 'łodz') {
         selectedCircuit.city_id = 'lodz'
      }

      if (selectedCircuit.city_id === 'piła') {
         selectedCircuit.city_id = 'pila'
      }

      if (sortedCircuit.city_id == selectedCircuit.city_id) {
         console.log(sortedCircuit.city_id, selectedCircuit.city_id, 'OK')
         sortedCircuit.isTripOrigin = true
      }

      if (index < tripCount) {
         sortedCircuit.isDestination = true
      }

      return sortedCircuit
   })

   sortedCircuits.forEach((circuit: Circuit, index: number) => {
      if (index < 3) {
         console.log(
            `${circuit.city_name}: score: ${circuit.score} / distance: ${circuit.distance_from_origin} km`,
            `/ swing difference: ${getSwingDifference(tripOrigin, circuit)}`
         )
      }
   })
   res.status(200).json(sortedCircuits)
}
