import { useCallback, useMemo } from "react"
import { ImageWithSettings } from "../../types/types"
import { PrimeIcons } from "primereact/api"
import { Button } from "primereact/button"
import { Checkbox } from "primereact/checkbox"

export interface ImageListProps {
   images: Array<{ image: ImageWithSettings; isSelected: boolean }>

   onImageRemove?: (id: string) => void
   onImageSelect?: (id: string) => void
   onImageDownload?: (id: string) => void
}

const ImageList = ({
   images,
   onImageDownload,
   onImageRemove,
   onImageSelect,
}: ImageListProps) => {
   const toggleImageSelected = useCallback(
      (id: string) => {
         onImageSelect && onImageSelect(id)
      },
      [onImageSelect]
   )

   const imageList = useMemo(() => {
      return images.map((image) => {
         return (
            <div
               key={image.image.id}
               className="col-12 sm:col-6 md:col-12 lg:col-4 xl:col-3
               border-round-lg p-1"
            >
               <div className="grid bg-green-100 m-1 shadow-2 h-full">
                  <div className="col-2 p-0 m-0">
                     {onImageSelect && (
                        <Checkbox
                           checked={image.isSelected}
                           onChange={() => toggleImageSelected(image.image.id)}
                        />
                     )}
                     {onImageRemove && (
                        <Button
                           icon={`${PrimeIcons.TIMES}`}
                           onClick={() => {
                              onImageRemove(image.image.id)
                           }}
                        ></Button>
                     )}
                     {onImageDownload && (
                        <Button
                           icon={`${PrimeIcons.DOWNLOAD}`}
                           onClick={() => onImageDownload(image.image.id)}
                        ></Button>
                     )}
                  </div>
                  <div
                     className="col-10 p-0 m-0 h-full 
                     justify-content-center flex align-items-center"
                     onClick={() => toggleImageSelected(image.image.id)}
                  >
                     <div>
                        <img
                           src={image.image.imageData.dataUrl}
                           className="max-w-full max-h-full"
                           style={{ aspectRatio: 1 }}
                        />
                     </div>
                  </div>
               </div>
            </div>
         )
      })
   }, [
      images,
      onImageDownload,
      onImageRemove,
      onImageSelect,
      toggleImageSelected,
   ])

   return (
      <div className="h-30rem overflow-y-auto overflow-x-hidden p-1">
         <div className="grid">{imageList}</div>
      </div>
   )
}

export { ImageList }
