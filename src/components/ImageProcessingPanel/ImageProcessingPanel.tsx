import { useAtomValue } from "jotai"
import { uploadedFilesAtom } from "../../atoms/atoms"
import { Colorer } from "../Colorer/Colorer"
import { ColoringProcessor } from "../ColoringProcessor/ColoringProcessor"
import { CustomGalleria } from "../Galleria/CustomGalleria"
import { ImageScroller } from "../ImageScroller"
import { useMemo } from "react"

const ImageProcessingPanel = () => {
   const uploadedImages = useAtomValue(uploadedFilesAtom)

   const images = useMemo(() => {
      return uploadedImages.map((file) => file.image)
   }, [uploadedImages])

   return (
      <>
         <ImageScroller images={images} />
         <Colorer />
         <CustomGalleria />
         <ColoringProcessor />
      </>
   )
}

export { ImageProcessingPanel }
