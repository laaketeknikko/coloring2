import { Panel } from "primereact/panel"

import {
   coloredImagesAtom,
   processingQueueAtom,
   uploadedImagesAtom,
} from "../../atoms/atoms"
import { useAtom } from "jotai"
import { ImageList } from "./ImageList"
import { TabPanel, TabView } from "primereact/tabview"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "primereact/button"

import { ImageWithSettings } from "../../types/types"
import { v4 } from "uuid"
import { zipImages } from "../../utils/zipping"

const ImageViewer = () => {
   const [uploadedImages, setUploadedImages] = useAtom(uploadedImagesAtom)
   const [selectedUploadedImages, setSelectedUploadedImages] = useState([
      ...uploadedImages.map((image) => {
         return { image: image, isSelected: true }
      }),
   ])

   useEffect(() => {
      const images = uploadedImages.map((image) => {
         const isSelected = selectedUploadedImages.find((entry) => {
            return entry.image.id === image.id
         })?.isSelected

         return {
            image: image,
            isSelected: isSelected === undefined ? true : isSelected,
         }
      })

      setSelectedUploadedImages(images)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [uploadedImages])

   const toggleUploadedImageSelected = useCallback(
      (id: string) => {
         const imageIndex = selectedUploadedImages.findIndex(
            (image) => image.image.id === id
         )

         if (imageIndex !== -1) {
            selectedUploadedImages[imageIndex].isSelected =
               !selectedUploadedImages[imageIndex].isSelected
            setSelectedUploadedImages([...selectedUploadedImages])
         }
      },
      [selectedUploadedImages]
   )

   const handleUploadedImageRemove = (id: string) => {
      setUploadedImages(uploadedImages.filter((image) => image.id !== id))
   }

   const [coloredImages, setColoredImages] = useAtom(coloredImagesAtom)
   const [selectedColoredImages, setSelectedColoredImages] = useState([
      ...coloredImages.map((image) => {
         return { image: image, isSelected: true }
      }),
   ])

   useEffect(() => {
      const images = coloredImages.map((image) => {
         const isSelected = selectedColoredImages.find((entry) => {
            return entry.image.id === image.id
         })?.isSelected

         return {
            image: image,
            isSelected: isSelected === undefined ? true : isSelected,
         }
      })

      setSelectedColoredImages(images)

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [coloredImages])

   const toggleColoredImageSelected = useCallback(
      (id: string) => {
         const imageIndex = selectedColoredImages.findIndex(
            (image) => image.image.id === id
         )

         if (imageIndex !== -1) {
            selectedColoredImages[imageIndex].isSelected =
               !selectedColoredImages[imageIndex].isSelected
            setSelectedColoredImages([...selectedColoredImages])
         }
      },
      [selectedColoredImages]
   )

   const handleColoredImageRemove = (id: string) => {
      setColoredImages(coloredImages.filter((image) => image.id !== id))
   }

   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)
   const queuedImages = useMemo(() => {
      return processingQueue.map((image) => {
         return { image: image, isSelected: false }
      })
   }, [processingQueue])

   const handleQueuedImageRemoved = (id: string) => {
      setProcessingQueue(processingQueue.filter((image) => image.id !== id))
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

   const panelRef = useRef<Panel>(null)

   const headerTemplate = () => {
      return (
         <div>
            <div>
               <Button
                  onClick={() =>
                     addImagesToQueue(
                        uploadedImages.map((image) => {
                           return {
                              image: image,
                              isSelected: true,
                           }
                        })
                     )
                  }
               >
                  Queue uploaded
               </Button>
               <Button
                  onClick={() =>
                     addImagesToQueue(
                        coloredImages.map((image) => {
                           return {
                              image: image,
                              isSelected: true,
                           }
                        })
                     )
                  }
               >
                  Queue colored
               </Button>
            </div>
         </div>
      )
   }

   return (
      <Panel
         pt={{
            content: {
               className: "bg-teal-50",
            },
         }}
         className="m-0 p-0 bg-yellow-100"
         ref={panelRef}
         headerTemplate={headerTemplate}
      >
         <TabView
            renderActiveOnly={false}
            className="m-0 p-0"
            pt={{
               nav: {
                  className: "bg-yellow-50",
               },
               navContainer: {
                  className: "bg-yellow-50",
               },
               navContent: {
                  className: "bg-yellow-50",
               },
               panelContainer: {
                  className: "bg-green-50",
               },
            }}
         >
            <TabPanel header="Uploaded images" className="bg-teal-50">
               <div className="">
                  <Button
                     onClick={() => {
                        const notSelected = selectedUploadedImages.filter(
                           (image) => {
                              return !image.isSelected
                           }
                        )

                        setSelectedUploadedImages(notSelected)
                        setUploadedImages(
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
                        addImagesToQueue(selectedUploadedImages)
                     }}
                  >
                     Queue selected
                  </Button>
                  <ImageList
                     onImageRemove={handleUploadedImageRemove}
                     images={selectedUploadedImages}
                     onImageSelect={toggleUploadedImageSelected}
                  />
               </div>
            </TabPanel>
            <TabPanel header="Colored images" className="">
               <div className="">
                  <Button
                     onClick={() => {
                        const notSelected = selectedColoredImages.filter(
                           (image) => {
                              return !image.isSelected
                           }
                        )

                        setSelectedColoredImages(notSelected)
                        setColoredImages(
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
                        addImagesToQueue(selectedColoredImages)
                     }}
                  >
                     Queue selected
                  </Button>
                  <Button
                     onClick={() => {
                        zipImages(
                           selectedColoredImages
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
                  <ImageList
                     onImageRemove={handleColoredImageRemove}
                     onImageSelect={toggleColoredImageSelected}
                     images={selectedColoredImages}
                  />
               </div>
            </TabPanel>
            <TabPanel header="Queued images">
               <div className="">
                  <ImageList
                     images={queuedImages}
                     onImageRemove={handleQueuedImageRemoved}
                  />
               </div>
            </TabPanel>
         </TabView>
      </Panel>
   )
}

export { ImageViewer }
