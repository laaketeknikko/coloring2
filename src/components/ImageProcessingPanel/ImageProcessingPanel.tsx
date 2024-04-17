import { ColoringProcessor } from "../ColoringProcessor/ColoringProcessor"

import { ImageViewer } from "../ImageViewer/ImageViewer"

const ImageProcessingPanel = () => {
   return (
      <>
         <ImageViewer />
         <ColoringProcessor />
      </>
   )
}

export { ImageProcessingPanel }
