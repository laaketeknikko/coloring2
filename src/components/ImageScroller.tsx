import Image from "image-js"

export interface ImageScrollerProps {
   images: Array<Image>
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
                  style={{ height: "30vh", display: "inline-block" }}
                  src={image.toDataURL()}
                  key={image.toDataURL()}
               />
            )
         })}
      </div>
   )
}

export { ImageScroller }
