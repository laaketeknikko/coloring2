import { ImageWithSettings } from "../types/types"

export interface ImageScrollerProps {
   images: Array<ImageWithSettings>
}

const ImageScroller = ({ images }: ImageScrollerProps) => {
   return (
      <div
         style={{
            overflow: "auto",
            whiteSpace: "nowrap",
         }}
      >
         {images.map((image) => {
            return (
               <img
                  style={{ height: "20vh", display: "inline-block" }}
                  src={image.imageData.dataUrl}
                  key={image.id}
               />
            )
         })}
      </div>
   )
}

export { ImageScroller }
