// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var fs = require('fs')
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   const { selectedCircuit, circuits } = req.body
   const routeListFilename = 'route-list.json'
   const routeListDir = path.resolve('./public', routeListFilename)

   const extraScoreFilename = 'extra-score-list.json'
   const extraScoreDir = path.resolve('./public', extraScoreFilename)

   const routes = JSON.parse(fs.readFileSync(routeListDir))
   let extraScores = JSON.parse(fs.readFileSync(extraScoreDir))

   const createScoreMap = () => {
      // map as in Map Object in Javascript
      // not a google map
      const map = new Map()
      Object.entries(extraScores).forEach((extraScore: any) => {
         extraScore = extraScore[1]
         map.set(extraScore.circuit_number, extraScore)
      })

      return map
   }

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

   const getFavoriteStatus = (circuit: Circuit) => {
      const scoreMap = createScoreMap()
      const originNum = tripOrigin.circuit_number
      const targetNumString = circuit.circuit_number.toString()
      const originExtraScore = scoreMap.get(originNum)
      let favoriteTargets = originExtraScore.favorite_targets

      if (favoriteTargets) {
         // multiple favorite targets
         if (typeof favoriteTargets == 'string') {
            favoriteTargets = favoriteTargets.replace(/\s/g, '') // remove whitespace
            favoriteTargets = favoriteTargets.split(',')
         }

         // single favorite target
         if (typeof favoriteTargets == 'number') {
            favoriteTargets = [favoriteTargets.toString()]
         }

         if (favoriteTargets.includes(targetNumString)) {
            // console.log`🎔  ${originNum} ${tripOrigin.city_name} -> ${circuit.circuit_number} ${circuit.city_name} `()
            return true
         } else {
            return false
         }
      }
   }

   const getCircuitScore = (circuitToScoreAgainst: Circuit) => {
      const circuit = circuitToScoreAgainst
      if (circuit.city_id === 'łodz') {
         circuit.city_id = 'lodz'
      }

      // negative swingDifference means you gain SF by voting at the circuit
      const swingDifference = tripOrigin.swing_factor - circuit.swing_factor

      // SCORING FORMULA
      const distanceWeight = 1.5 // math weight of distance ie how much should distance impact the score;

      // if target is a favorite, give it extra score
      const extraScore = getFavoriteStatus(circuit) ? 20000 : 0
      let score =
         Math.floor(swingDifference * 1000) -
         getDistanceFromOrigin(circuit) * distanceWeight +
         extraScore

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

   // mark targets as favorite
   // mark the objects as isTripOrigin or isDestination, for use in map nodes
   sortedCircuits = sortedCircuits.map((sortedCircuit: ScoredCircuit, index: number) => {
      if (selectedCircuit.city_id === 'łodz') {
         selectedCircuit.city_id = 'lodz'
      }

      if (selectedCircuit.city_id === 'piła') {
         selectedCircuit.city_id = 'pila'
      }

      if (sortedCircuit.city_id == selectedCircuit.city_id) {
         //  console.log(sortedCircuit.city_id, selectedCircuit.city_id, 'OK')
         sortedCircuit.isTripOrigin = true
      }

      if (index < tripCount) {
         sortedCircuit.isDestination = true
      }

      if (getFavoriteStatus(sortedCircuit)) {
         sortedCircuit.isFavorite = true
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
