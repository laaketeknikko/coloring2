import { Button } from "primereact/button"
import { ImageWithSettings } from "../types/types"
import { RemoveButton } from "./utils/RemoveButton"
import { PrimeIcons } from "primereact/api"

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
                  className="relative inline-block h-full mx-2 shadow-2"
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
                     <div className="flex flex-row gap-1 justify-content-start">
                        {onImageRemove && (
                           <div className="">
                              <RemoveButton
                                 onRemove={onImageRemove}
                                 id={image.id}
                              />
                           </div>
                        )}
                        {onImageDownload && (
                           <div className="">
                              <Button
                                 icon={`${PrimeIcons.DOWNLOAD}`}
                                 role="button"
                                 onClick={() => {
                                    const aElem = document.createElement("a")
                                    aElem.href = image.imageData.dataUrl
                                    aElem.download = `${image.imageData.meta.name}`
                                    aElem.click()
                                 }}
                              ></Button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export { ImageScroller }
