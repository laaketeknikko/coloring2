import { ImageWithSettings } from "../types/types"
import { ImageActionButtons } from "./utils/ImageActionButtons"

export interface ImageScrollerProps {
   images: Array<ImageWithSettings>
   onImageRemove?: (id: string) => void
   onImageDownload?: (id: string) => void
}

const ImageScroller = ({
   images,
   onImageRemove,
   onImageDownload,
}: ImageScrollerProps) => {
   return (
      <div
         className="m-2"
         style={{
            height: "100%",
            overflow: "auto",
            whiteSpace: "nowrap",
         }}
      >
         {images.map((image) => {
            return (
               <div
                  key={image.id}
                  className="relative inline-block h-full mx-2 shadow"
               >
                  <div
                     className=""
                     style={{
                        height: "100%",
                        aspectRatio: 1,
                        backgroundSize: "contain",
                        backgroundPosition: "bottom",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url("${image.imageData.dataUrl}")`,
                     }}
                  >
                     <ImageActionButtons
                        id={image.id}
                        onImageDownload={onImageDownload}
                        onImageRemove={onImageRemove}
                     />
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export { ImageScroller }
