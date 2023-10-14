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

   const extraScoreMap = createScoreMap()

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
      const originExtraScoreData = scoreMap.get(originNum)

      console.log(originExtraScoreData)
      // let favoriteTargets = originExtraScore.favorite_targets

      // if (favoriteTargets) {
      //    // multiple favorite targets
      //    if (typeof favoriteTargets == 'string') {
      //       favoriteTargets = favoriteTargets.replace(/\s/g, '') // remove whitespace
      //       favoriteTargets = favoriteTargets.split(',')
      //    }

      //    // single favorite target
      //    if (typeof favoriteTargets == 'number') {
      //       favoriteTargets = [favoriteTargets.toString()]
      //    }

      //    if (favoriteTargets.includes(targetNumString)) {
      //       // console.log`🎔  ${originNum} ${tripOrigin.city_name} -> ${circuit.circuit_number} ${circuit.city_name} `()
      //       return true
      //    } else {
      //       return false
      //    }
      // }
   }

   const getCircuitScore = (circuitToScoreAgainst: Circuit) => {
      const circuit = circuitToScoreAgainst

      if (circuit.city_id === 'łodz') {
         circuit.city_id = 'lodz'
      }

      const originExtras = extraScoreMap.get(tripOrigin.circuit_number)
      const targetExtras = extraScoreMap.get(circuitToScoreAgainst.circuit_number)

      let extraScore = 0 // extra score value for sorting

      // if less than 5000 votes to loss in origin, give a huge penalty
      if (originExtras.votes_to_lose_mandate < 5000) {
         console.log('FREEZE ORIGIN')
         extraScore = extraScore - 100000
      }

      console.log(
         tripOrigin.circuit_number,
         tripOrigin.city_name,
         '->',
         circuit.circuit_number,
         circuit.city_name
      )

      // negative gDiff should devalue target
      const gainDifference = originExtras.votes_to_gain_mandate - targetExtras.votes_to_gain_mandate
      extraScore = extraScore + gainDifference

      console.log('-------')
      console.log('Gain diff', gainDifference)

      // negative swingDifference means you gain SF by voting at the circuit
      const swingDifference = tripOrigin.swing_factor - circuit.swing_factor

      // SCORING FORMULA
      const distanceWeight = 1.5 // math weight of distance ie how much should distance impact the score;
      const distance = getDistanceFromOrigin(circuit)

      let score = extraScore - distance * 100

      return score
   }

   const scoredCircuits = circuits.map((circuit: Circuit) => {
      const votesToGain = extraScoreMap.get(circuit.circuit_number).votes_to_gain_mandate
      const votesToLose = extraScoreMap.get(circuit.circuit_number).votes_to_lose_mandate
      const gainingFrom = extraScoreMap.get(circuit.circuit_number).gaining_from
      const losingTo = extraScoreMap.get(circuit.circuit_number).losing_to
      return {
         ...circuit,
         score: getCircuitScore(circuit),
         distance_from_origin: getDistanceFromOrigin(circuit),
         route: getRouteFromOrigin(circuit),
         votesToGain: votesToGain,
         votesToLose: votesToLose,
         gainingFrom: gainingFrom,
         losingTo: losingTo,
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
      console.log(sortedCircuit.score)

      if (selectedCircuit.city_id === 'łodz') {
         selectedCircuit.city_id = 'lodz'
      }

      if (selectedCircuit.city_id === 'piła') {
         selectedCircuit.city_id = 'pila'
      }

      if (index == 0 && sortedCircuit.score < 0) {
         sortedCircuit.isNegative = true
      }

      if (sortedCircuit.city_id == selectedCircuit.city_id) {
         sortedCircuit.isTripOrigin = true
      }

      if (index < tripCount) {
         sortedCircuit.isDestination = true
      }

      // if (getFavoriteStatus(sortedCircuit)) {
      //    sortedCircuit.isFavorite = true
      // }

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
