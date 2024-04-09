import { useAtomValue } from "jotai"
import { uploadedFilesAtom } from "../../atoms/atoms"
import { Colorer } from "../Colorer/Colorer"
import { ColoringProcessor } from "../ColoringProcessor/ColoringProcessor"
import { CustomGalleria } from "../Galleria/CustomGalleria"
import { ImageScroller } from "../ImageScroller"

const ImageProcessingPanel = () => {
   const uploadedImages = useAtomValue(uploadedFilesAtom)

   return (
      <>
         <ImageScroller images={uploadedImages} />
         <Colorer />
         <CustomGalleria />
         <ColoringProcessor />
      </>
   )
}

export { ImageProcessingPanel }
