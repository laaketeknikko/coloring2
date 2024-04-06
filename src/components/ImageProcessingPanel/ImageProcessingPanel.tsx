import { Colorer } from "../Colorer/Colorer"
import { ColoringProcessor } from "../ColoringProcessor/ColoringProcessor"
import { CustomGalleria } from "../Galleria/CustomGalleria"

const ImageProcessingPanel = () => {
   return (
      <>
         <Colorer />
         <CustomGalleria />
         <ColoringProcessor />
      </>
   )
}

export { ImageProcessingPanel }
