import { useAtom } from "jotai"
import { uploadedFilesAtom } from "../../atoms/atoms"
import { Colorer } from "../Colorer/Colorer"
import { ColoringProcessor } from "../ColoringProcessor/ColoringProcessor"
import { CustomGalleria } from "../Galleria/CustomGalleria"
import { ImageScroller } from "../ImageScroller"

const ImageProcessingPanel = () => {
   const [uploadedImages, setUploadedImages] = useAtom(uploadedFilesAtom)

   const handleImageRemoved = (id: string) => {
      setUploadedImages(uploadedImages.filter((image) => image.id !== id))
   }

   return (
      <>
         <div style={{ height: "18vh" }}>
            <ImageScroller
               images={uploadedImages}
               onImageRemove={handleImageRemoved}
            />
         </div>
         <Colorer />
         <CustomGalleria />
         <ColoringProcessor />
      </>
   )
}

export { ImageProcessingPanel }
