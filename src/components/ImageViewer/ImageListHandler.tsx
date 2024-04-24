import { PrimitiveAtom, useAtom } from "jotai"
import { ImageWithSettings } from "../../types/types"
import { useState, useEffect, useCallback } from "react"
import { processingQueueAtom } from "../../atoms/atoms"
import { v4 } from "uuid"
import { Button } from "primereact/button"
import { TriStateCheckbox } from "primereact/tristatecheckbox"
import { ImageList } from "./ImageList"
import { PrimeIcons } from "primereact/api"
import { Sidebar } from "primereact/sidebar"
import { CustomGalleria } from "../Galleria/CustomGalleria"
import { zipImages } from "../../utils/zipping"

export interface ImageListHandlerProps {
   imageListAtom: PrimitiveAtom<Array<ImageWithSettings>>
   enableColoredFullScreen?: boolean
   enableDownload?: boolean
}

const ImageListHandler = ({
   imageListAtom,
   enableColoredFullScreen = false,
   enableDownload = false,
}: ImageListHandlerProps) => {
   const [imageList, setImageList] = useAtom(imageListAtom)

   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)

   const [selectedImages, setSelectedImages] = useState([
      ...imageList.map((image) => {
         return { image: image, isSelected: true }
      }),
   ])

   const [allImagesSelected, setAllImagesSelected] = useState<boolean | null>(
      null
   )

   useEffect(() => {
      const images = imageList.map((image) => {
         const isSelected = selectedImages.find((entry) => {
            return entry.image.id === image.id
         })?.isSelected

         return {
            image: image,
            isSelected: Boolean(isSelected),
         }
      })

      setSelectedImages(images)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [imageList])

   const toggleImageSelected = useCallback(
      (id: string) => {
         const imageIndex = selectedImages.findIndex(
            (image) => image.image.id === id
         )

         if (imageIndex !== -1) {
            selectedImages[imageIndex].isSelected =
               !selectedImages[imageIndex].isSelected
            setSelectedImages([...selectedImages])
         }
      },
      [selectedImages]
   )

   const handleImageRemove = (id: string) => {
      setImageList(imageList.filter((image) => image.id !== id))
   }

   const addImagesToQueue = (
      images: Array<{ image: ImageWithSettings; isSelected: boolean }>
   ) => {
      const queuedImages = images
         .filter((image) => image.isSelected)
         .map((image) => {
            return {
               ...image.image,
               id: v4(),
            }
         })

      setProcessingQueue([...processingQueue, ...queuedImages])
   }

   const [isFullScreenGallery, setIsFullScreenGallery] = useState(false)

   return (
      <div>
         <div className="">
            <Button>
               <label>
                  <TriStateCheckbox
                     value={allImagesSelected}
                     onChange={(e) => {
                        if (e.value === false) {
                           setAllImagesSelected(false)
                           setSelectedImages([
                              ...selectedImages.map((image) => {
                                 return {
                                    image: image.image,
                                    isSelected: false,
                                 }
                              }),
                           ])
                        } else if (e.value === true) {
                           setAllImagesSelected(true)
                           setSelectedImages([
                              ...selectedImages.map((image) => {
                                 return {
                                    image: image.image,
                                    isSelected: true,
                                 }
                              }),
                           ])
                        } else {
                           setAllImagesSelected(null)
                        }
                     }}
                  />
                  Select all
               </label>
            </Button>

            {enableColoredFullScreen && (
               <Button
                  onClick={() => {
                     setIsFullScreenGallery(true)
                  }}
                  icon={PrimeIcons.WINDOW_MAXIMIZE}
               ></Button>
            )}

            <Button
               onClick={() => {
                  const notSelected = selectedImages.filter((image) => {
                     return !image.isSelected
                  })

                  setSelectedImages(notSelected)
                  setImageList(
                     notSelected.map((image) => {
                        return image.image
                     })
                  )
               }}
            >
               Delete selected
            </Button>
            <Button
               onClick={() => {
                  addImagesToQueue(selectedImages)
               }}
            >
               Queue selected
            </Button>

            {enableDownload && (
               <Button
                  onClick={() => {
                     zipImages(
                        selectedImages
                           .filter((image) => image.isSelected)
                           .map((image) => {
                              return image.image
                           }),
                        (error, data) => {
                           if (error) {
                              console.log(error)
                              return
                           }

                           const blob = new Blob([data], {
                              type: "application/zip",
                           })

                           const a = document.createElement("a")
                           a.href = URL.createObjectURL(blob)
                           a.download = "colored_images.zip"
                           a.click()
                           URL.revokeObjectURL(a.href)
                        }
                     )
                  }}
               >
                  Download selected
               </Button>
            )}

            <ImageList
               onImageRemove={handleImageRemove}
               images={selectedImages}
               onImageSelect={toggleImageSelected}
            />
         </div>

         {enableColoredFullScreen && (
            <Sidebar
               visible={isFullScreenGallery}
               fullScreen={isFullScreenGallery}
               onHide={() => {
                  setIsFullScreenGallery(false)
               }}
               header="Colored images"
            >
               <CustomGalleria />
            </Sidebar>
         )}
      </div>
   )
}

export { ImageListHandler }
