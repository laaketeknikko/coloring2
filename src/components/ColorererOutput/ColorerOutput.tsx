import { useContext } from "react"
import { ColoredImagesContext } from "../../context/contexts"
import { Galleria } from "primereact/galleria"

const ColorerOutput = () => {
   const coloredImages = useContext(ColoredImagesContext)

   return <Galleria></Galleria>
}

export { ColorerOutput }
