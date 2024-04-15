import { useCallback, useMemo, useState } from "react"
import { ImageWithSettings } from "../../types/types"
import { PrimeIcons } from "primereact/api"
import { Button } from "primereact/button"
import { Checkbox } from "primereact/checkbox"

export interface ImageListProps {
   images: Array<ImageWithSettings>
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
   const [selectedImages, setSelectedImages] = useState(
      new Set(images.map((image) => image.id))
   )

   const toggleImageSelected = useCallback(
      (id: string) => {
         if (selectedImages.has(id)) {
            selectedImages.delete(id)
            setSelectedImages(new Set(selectedImages))
         } else {
            setSelectedImages(new Set(selectedImages.add(id)))
         }

         console.log("set: ", selectedImages)

         onImageSelect && onImageSelect(id)
      },
      [onImageSelect, selectedImages]
   )

   const imageList = useMemo(() => {
      return images.map((image) => {
         return (
            <div
               key={image.id}
               className="col-6 sm:col-4 md:col-3 lg:col-2 xl:col-1"
            >
               <div className="grid">
                  <div className="col-2">
                     {onImageRemove && (
                        <Button
                           icon={`${PrimeIcons.TIMES}`}
                           onClick={() => {
                              onImageRemove(image.id)
                           }}
                        ></Button>
                     )}
                     <Checkbox checked={selectedImages.has(image.id)} />
                  </div>
                  <div className="col-10">
                     <img
                        onClick={() => toggleImageSelected(image.id)}
                        src={image.imageData.dataUrl}
                        className="max-w-full max-h-full"
                        style={{ aspectRatio: 1 }}
                     />
                  </div>
               </div>
            </div>
         )
      })
   }, [images, onImageRemove, selectedImages, toggleImageSelected])

   return <div className="grid">{imageList}</div>
}

export { ImageList }
