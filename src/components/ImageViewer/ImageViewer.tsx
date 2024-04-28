import { Panel } from "primereact/panel"

import {
   coloredImagesAtom,
   processingQueueAtom,
   uploadedImagesAtom,
} from "../../atoms/atoms"
import { useAtom } from "jotai"
import { TabPanel, TabView } from "primereact/tabview"
import { useRef, useState } from "react"
import { Button } from "primereact/button"

import { ImageWithSettings } from "../../types/types"
import { v4 } from "uuid"
import { Sidebar } from "primereact/sidebar"
import { CustomGalleria } from "../Galleria/CustomGalleria"
import { ImageListHandler } from "./ImageListHandler"
import { Settings } from "../Settings/Settings"

const ImageViewer = () => {
   const [uploadedImages] = useAtom(uploadedImagesAtom)
   const [coloredImages] = useAtom(coloredImagesAtom)

   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)

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
                  onClick={() => {
                     addImagesToQueue(
                        uploadedImages.map((image) => {
                           return {
                              image: image,
                              isSelected: true,
                           }
                        })
                     )
                  }}
               >
                  Queue uploaded
               </Button>
               <Button
                  onClick={() => {
                     addImagesToQueue(
                        coloredImages.map((image) => {
                           return {
                              image: image,
                              isSelected: true,
                           }
                        })
                     )
                  }}
               >
                  Queue colored
               </Button>
            </div>
         </div>
      )
   }

   const [isFullScreenGallery, setIsFullScreenGallery] = useState(false)

   return (
      <div>
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
                     className: "bg-green-50 m-0 p-0",
                  },
               }}
            >
               {/** Settings */}
               <TabPanel leftIcon="pi pi-cog" className="bg-teal-50 p-0 m-0">
                  <Settings />
               </TabPanel>

               {/** Uploaded images */}
               <TabPanel
                  header="Uploaded images"
                  className="bg-teal-50 p-0 m-0"
               >
                  <ImageListHandler imageListAtom={uploadedImagesAtom} />
               </TabPanel>

               {/** Colored images */}
               <TabPanel
                  leftIcon="pi pi-palette"
                  header={<span className="ml-1">Colored images</span>}
                  className=""
               >
                  <ImageListHandler
                     imageListAtom={coloredImagesAtom}
                     enableDownload={true}
                     enableColoredFullScreen={true}
                  />
               </TabPanel>

               {/** Queued images */}
               <TabPanel header="Queued images">
                  <ImageListHandler imageListAtom={processingQueueAtom} />
               </TabPanel>
            </TabView>
         </Panel>
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
      </div>
   )
}

export { ImageViewer }
