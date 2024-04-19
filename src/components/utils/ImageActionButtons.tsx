import { Button } from "primereact/button"
import { RemoveButton } from "./RemoveButton"
import { PrimeIcons } from "primereact/api"

export interface ImageActionButtons {
   id: string
   onImageRemove?: (id: string) => void
   onImageDownload?: (id: string) => void
}

const ImageActionButtons = ({
   id,
   onImageRemove,
   onImageDownload,
}: ImageActionButtons) => {
   return (
      <div className="flex flex-row gap-1 justify-content-start">
         {onImageRemove && (
            <div className="">
               <RemoveButton onRemove={onImageRemove} id={id} />
            </div>
         )}
         {onImageDownload && (
            <div className="">
               <Button
                  icon={PrimeIcons.DOWNLOAD}
                  role="button"
                  onClick={() => {
                     onImageDownload(id)
                  }}
               ></Button>
            </div>
         )}
      </div>
   )
}

export { ImageActionButtons }
