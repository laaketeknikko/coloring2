import { useAtom } from "jotai"
import { Galleria } from "primereact/galleria"
import { processedImagesAtom } from "../../atoms/atoms"
import { useCallback, useMemo, useState } from "react"
import { Button } from "primereact/button"

import { PrimeIcons } from "primereact/api"
import { Sidebar } from "primereact/sidebar"
import { ImageWithSettings } from "../../types/types"

import { ImageActionButtons } from "../utils/ImageActionButtons"
import Image from "image-js"
import { Skeleton } from "primereact/skeleton"

const CustomGalleria = () => {
   const [processedImages, setProcessedImages] = useAtom(processedImagesAtom)

   const itemTemplate = (item: ImageWithSettings) => {
      if (item.id === "placeholder") {
         return (
            <Skeleton
               animation="none"
               borderRadius="30px"
               height="10rem"
            ></Skeleton>
         )
      }

      return (
         <div style={{ width: "100%", height: "70vh" }}>
            <img
               src={item.imageData.dataUrl}
               alt={item.imageData.meta.name}
               style={{ maxWidth: "100%", maxHeight: "100%" }}
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
         if (item.id === "placeholder") {
            return <Skeleton height="10rem"></Skeleton>
         }

         return (
            <div>
               <img
                  src={item.imageData.dataUrl}
                  alt={`${item.imageData.meta.name} thumbnail`}
                  style={{ height: "18vh" }}
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
      const placeHolder: Array<ImageWithSettings> = [
         {
            id: "placeholder",
            imageData: {
               dataUrl: "",
               image: new Image(),
               meta: {
                  name: "placeholder",
               },
            },
            settings: {
               borderColor: { r: 0, g: 0, b: 0 },
               borderColorTolerance: { r: 0, g: 0, b: 0 },
               borderPatching: 0,
               colorByAreaNumber: false,
               colorByAreaSize: false,
               colorsToUse: [],
            },
         },
      ]

      return (
         <Galleria
            showThumbnailNavigators={false}
            showIndicatorsOnItem={false}
            showItemNavigatorsOnHover={true}
            indicatorsPosition="top"
            changeItemOnIndicatorHover={true}
            showIndicators={true}
            thumbnailsPosition="top"
            value={processedImages.length === 0 ? placeHolder : processedImages}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
         />
      )
   }, [processedImages, thumbnailTemplate])

   return (
      <>
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
