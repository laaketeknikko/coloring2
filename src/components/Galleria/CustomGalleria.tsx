import { useAtom } from "jotai"
import { Galleria } from "primereact/galleria"
import { coloredImagesAtom } from "../../atoms/atoms"
import { useCallback, useMemo, useState } from "react"
import { Button } from "primereact/button"

import { PrimeIcons } from "primereact/api"
import { Sidebar } from "primereact/sidebar"
import { ImageWithSettings } from "../../types/types"

import { ImageActionButtons } from "../utils/ImageActionButtons"
import Image from "image-js"
import { Skeleton } from "primereact/skeleton"
import { primeFlexBreakPoints } from "../../config/config"

const CustomGalleria = () => {
   const [processedImages, setProcessedImages] = useAtom(coloredImagesAtom)

   const [activeIndex, setActiveIndex] = useState(0)
   const [fullScreenGallery, setFullScreenGallery] = useState(false)

   const itemTemplate = useCallback(
      (item: ImageWithSettings) => {
         if (item.id.startsWith("placeholder")) {
            return (
               <div className="w-full">
                  <Skeleton
                     className="m-2 p-2 w-10rem"
                     animation="none"
                     borderRadius="30px"
                     height="2rem"
                  ></Skeleton>
                  <Skeleton
                     className="m-2 p-2 w-15rem"
                     animation="none"
                     borderRadius="30px"
                     height="2rem"
                  ></Skeleton>
                  <Skeleton
                     className="m-2 p-2 w-20rem"
                     animation="none"
                     borderRadius="30px"
                     height="2rem"
                  ></Skeleton>
                  <Skeleton
                     className="m-2 p-2 w-25rem"
                     animation="none"
                     borderRadius="30px"
                     height="2rem"
                  ></Skeleton>
                  <Skeleton
                     className="m-2 p-2 w-30rem"
                     animation="none"
                     borderRadius="30px"
                     height="2rem"
                  ></Skeleton>
                  <Skeleton
                     className="m-2 p-2"
                     animation="none"
                     borderRadius="30px"
                     height="8rem"
                  ></Skeleton>
               </div>
            )
         }

         return (
            <div style={{ maxWidth: "100%", position: "relative" }}>
               {!fullScreenGallery && (
                  <Button
                     style={{ position: "absolute", top: 0, left: 0 }}
                     icon={PrimeIcons.WINDOW_MAXIMIZE}
                     onClick={() => {
                        setFullScreenGallery(true)
                     }}
                  ></Button>
               )}
               <img
                  src={item.imageData.dataUrl}
                  alt={item.imageData.meta.name}
                  style={{ maxWidth: "100%", aspectRatio: 1 }}
               />
            </div>
         )
      },
      [fullScreenGallery]
   )

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
         aElem.download = image.imageData.meta.name
         aElem.click()
      },
      [processedImages]
   )

   const thumbnailTemplate = useCallback(
      (item: ImageWithSettings) => {
         if (item.id.startsWith("placeholder")) {
            return (
               <Skeleton
                  className="m-2 p-2 w-10rem"
                  animation="none"
                  borderRadius="30px"
                  height="10rem"
               ></Skeleton>
            )
         }

         return (
            <div style={{ height: "18vh" }}>
               <img
                  src={item.imageData.dataUrl}
                  alt={`${item.imageData.meta.name} thumbnail`}
                  style={{ aspectRatio: 1, width: "100%" }}
               />
               <div className="grid justify-content-center p-0 m-0">
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

   const indicatorTemplate = (index: number) => {
      return (
         <Button
            className="bg-yellow-100 border-round-sm flex-1 p-0 m-1 w-3rem text-center justify-content-center text-teal-900"
            onClick={() => {
               setActiveIndex(index)
            }}
         >
            {index + 1}
         </Button>
      )
   }

   const galleria = useMemo(() => {
      const placeHolder: Array<ImageWithSettings> = [
         {
            id: "placeholder1",
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
               algorithmDirection: "8",
            },
         },
         {
            id: "placeholder2",
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
               algorithmDirection: "8",
            },
         },
         {
            id: "placeholder3",
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
               algorithmDirection: "8",
            },
         },
      ]

      return (
         <Galleria
            responsiveOptions={[
               {
                  breakpoint: String(primeFlexBreakPoints.sm),
                  numVisible: 1,
               },
               {
                  breakpoint: String(primeFlexBreakPoints.md),
                  numVisible: 2,
               },
               {
                  breakpoint: String(primeFlexBreakPoints.lg),
                  numVisible: 3,
               },
               {
                  breakpoint: String(primeFlexBreakPoints.xl),
                  numVisible: 4,
               },
            ]}
            className="bg-teal-50"
            pt={{
               thumbnailContainer: {
                  style: { backgroundColor: "transparent" },
               },
               indicators: {
                  className: "w-full overflow-auto flex-wrap",
               },
               indicator: {
                  className: "m-0 p-0",
               },
               item: {
                  className: "max-w-screen",
               },
               previousThumbnailIcon: {
                  className: "text-green-700 w-2rem h-2rem",
               },
               nextThumbnailIcon: {
                  className: "text-green-700 w-2rem h-2rem",
               },
               previousItemIcon: {
                  className: "text-green-700 w-2rem h-2rem",
               },
               nextItemIcon: {
                  className: "text-green-700 w-2rem h-2rem",
               },
            }}
            showThumbnailNavigators={true}
            showItemNavigators={true}
            showIndicatorsOnItem={false}
            indicatorsPosition="top"
            showIndicators={true}
            thumbnailsPosition="top"
            value={processedImages.length === 0 ? placeHolder : processedImages}
            activeIndex={activeIndex}
            onItemChange={(event) => {
               setActiveIndex(event.index)
            }}
            item={itemTemplate}
            indicator={indicatorTemplate}
            thumbnail={thumbnailTemplate}
         />
      )
   }, [activeIndex, itemTemplate, processedImages, thumbnailTemplate])

   return (
      <>
         {fullScreenGallery && (
            <Sidebar
               visible={true}
               fullScreen
               onHide={() => {
                  setFullScreenGallery(false)
               }}
            >
               {galleria}
            </Sidebar>
         )}
         {!fullScreenGallery && galleria}
      </>
   )
}

export { CustomGalleria }
