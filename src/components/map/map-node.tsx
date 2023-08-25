interface MapNodeProps {
   lat: number
   lng: number
   label: string
}

const MapNode = (props: MapNodeProps) => {
   console.log(props)

   return <div> Hello </div>
}

export default MapNode
