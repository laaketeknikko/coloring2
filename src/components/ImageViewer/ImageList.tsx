import { useCallback, useMemo } from "react"
import { ImageWithSettings } from "../../types/types"
import { PrimeIcons } from "primereact/api"
import { Button } from "primereact/button"
import { Checkbox } from "primereact/checkbox"
import { ScrollPanel } from "primereact/scrollpanel"

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
               className="col-6 sm:col-4 md:col-3 lg:col-2 xl:col-1"
            >
               <div className="grid">
                  <div className="col-2">
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
                  <div className="col-10">
                     <img
                        onClick={() => toggleImageSelected(image.image.id)}
                        src={image.image.imageData.dataUrl}
                        className="max-w-full max-h-full"
                        style={{ aspectRatio: 1 }}
                     />
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
      <ScrollPanel className="h-30rem">
         <div className="grid">{imageList}</div>
      </ScrollPanel>
   )
}

export { ImageList }
