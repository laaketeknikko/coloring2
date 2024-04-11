import { useAtomValue } from "jotai"
import { Galleria } from "primereact/galleria"
import { processedImagesAtom } from "../../atoms/atoms"
import { useMemo, useState } from "react"
import { Button } from "primereact/button"

import { PrimeIcons } from "primereact/api"
import { Sidebar } from "primereact/sidebar"
import { ImageWithSettings } from "../../types/types"
import { FlateCallback } from "fflate"
import { zipImages } from "../../utils/zipping"

const CustomGalleria = () => {
   const processedImages = useAtomValue(processedImagesAtom)

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

   const thumbnailTemplate = (item: ImageWithSettings) => {
      return (
         <img
            src={item.imageData.dataUrl}
            alt={`${item.imageData.meta.name} thumbnail`}
            style={{ height: "200px" }}
         />
      )
   }

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
   }, [processedImages])

   const onImagesZipped: FlateCallback = (error, data) => {
      if (error) {
         console.log(error)
         return
      }

      const blob = new Blob([data], { type: "application/zip" })

      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = "images.zip"
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
