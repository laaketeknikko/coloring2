import { useAtom } from "jotai"
import { Galleria } from "primereact/galleria"
import { processedImagesAtom } from "../../atoms/atoms"
import { useCallback, useMemo, useState } from "react"
import { Button } from "primereact/button"

import { PrimeIcons } from "primereact/api"
import { Sidebar } from "primereact/sidebar"
import { ImageWithSettings } from "../../types/types"
import { FlateCallback } from "fflate"
import { zipImages } from "../../utils/zipping"
import { ImageActionButtons } from "../utils/ImageActionButtons"

// TODO:
// 1. Hide the thumbnails
// 2. Show own image scroller in footer component
// 3. control shown image with activeIndex
// 4. Listen to onItemChange event and update activeIndex

const CustomGalleria = () => {
   const [processedImages, setProcessedImages] = useAtom(processedImagesAtom)

   const itemTemplate = (item: ImageWithSettings) => {
      return (
         <div>
            <Button
               role="button"
               onClick={() => {
                  const aElem = document.createElement("a")
                  aElem.href = item.imageData.dataUrl
                  aElem.download = `${item.imageData.meta.name}`
                  aElem.click()
               }}
            >
               Download image
            </Button>

            <img
               src={item.imageData.dataUrl}
               alt={item.imageData.meta.name}
               style={{ maxWidth: "100%", maxHeight: "100vh" }}
            />
         </div>
      )
   }

   const handleImageRemove = useCallback(
      (id: string) => {
         setProcessedImages(processedImages.filter((image) => image.id !== id))
      },
      [processedImages, setProcessedImages]
   )

   const handleImageDownload = useCallback(
      (id: string) => {
         const image = processedImages.find((image) => image.id === id)
         if (!image) {
            return
         }

         const aElem = document.createElement("a")
         aElem.href = image.imageData.dataUrl
         aElem.download = `${image.imageData.meta.name}`
         aElem.click()
      },
      [processedImages]
   )

   const thumbnailTemplate = useCallback(
      (item: ImageWithSettings) => {
         return (
            <div>
               <img
                  src={item.imageData.dataUrl}
                  alt={`${item.imageData.meta.name} thumbnail`}
                  style={{ height: "200px" }}
               />
               <div className="grid justify-content-center">
                  <div>
                     <ImageActionButtons
                        id={item.id}
                        onImageRemove={handleImageRemove}
                        onImageDownload={handleImageDownload}
                     />
                  </div>
               </div>
            </div>
         )
      },
      [handleImageDownload, handleImageRemove]
   )

   const [fullScreenGallery, setFullScreenGallery] = useState(false)

   const galleria = useMemo(() => {
      return (
         <Galleria
            showIndicatorsOnItem={true}
            showItemNavigatorsOnHover={true}
            indicatorsPosition="top"
            changeItemOnIndicatorHover={true}
            showIndicators={true}
            thumbnailsPosition="top"
            value={processedImages}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
         />
      )
   }, [processedImages, thumbnailTemplate])

   const onImagesZipped: FlateCallback = (error, data) => {
      if (error) {
         console.log(error)
         return
      }

      const blob = new Blob([data], { type: "application/zip" })

      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = "colored_images.zip"
      a.click()
      URL.revokeObjectURL(a.href)
   }

   return (
      <>
         <Button
            icon={`${PrimeIcons.DOWNLOAD} mr-2`}
            onClick={() => {
               zipImages(processedImages, onImagesZipped)
            }}
         >
            as zip
         </Button>
         <Button
            icon={`${PrimeIcons.WINDOW_MAXIMIZE}`}
            onClick={() => {
               setFullScreenGallery(true)
            }}
         ></Button>
         {fullScreenGallery && (
            <Sidebar
               visible={true}
               fullScreen
               onHide={() => setFullScreenGallery(false)}
            >
               {galleria}
            </Sidebar>
         )}
         {!fullScreenGallery && galleria}
      </>
   )
}

export { CustomGalleria }
