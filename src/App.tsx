import "primereact/resources/themes/saga-orange/theme.css"
import { ImageProcessingPanel } from "./components/ImageProcessingPanel/ImageProcessingPanel"
import { FileUploadPanel } from "./components/FileUploadPanel/FileUploadPanel"
import { Settings } from "./components/Settings/Settings"

import { PrimeIcons } from "primereact/api"
import { useState } from "react"
import { Toolbar } from "primereact/toolbar"
import { Button } from "primereact/button"

import { Sidebar } from "primereact/sidebar"
import {
   isProcessingPausedAtom,
   coloredImagesAtom,
   processingQueueAtom,
   uploadedImagesAtom,
} from "./atoms/atoms"
import { useAtom } from "jotai"
import { zipImages } from "./utils/zipping"
import { FlateCallback } from "fflate"
import { HelpButton } from "./utils/HelpButton"

function App() {
   const [showUploadPanel, setShowUploadPanel] = useState(false)

   const [processingQueue] = useAtom(processingQueueAtom)
   const [uploadedFiles] = useAtom(uploadedImagesAtom)
   const [processedImages] = useAtom(coloredImagesAtom)

   const [isProcessingPaused, setIsProcessingPaused] = useAtom(
      isProcessingPausedAtom
   )

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
      <div className="bg-green-50 min-h-screen">
         <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <Toolbar
               className="bg-teal-50 p-1"
               start={
                  <div>
                     <Button
                        className="m-1 border-circle"
                        icon={PrimeIcons.UPLOAD}
                        onClick={() => {
                           setShowUploadPanel(true)
                        }}
                     />
                     <span className="text-primary-700 text-2xl">
                        {uploadedFiles.length}
                     </span>
                  </div>
               }
               center={
                  <>
                     <p className="">
                        <span className="text-primary-700 text-2xl">
                           {processingQueue.length}
                        </span>
                     </p>

                     <Button
                        className="m-1 border-circle"
                        icon={
                           isProcessingPaused
                              ? PrimeIcons.PLAY
                              : PrimeIcons.PAUSE
                        }
                        onClick={() => {
                           if (isProcessingPaused) {
                              setIsProcessingPaused(false)
                           } else {
                              setIsProcessingPaused(true)
                           }
                        }}
                     ></Button>

                     <Button
                        className="m-1 border-circle"
                        icon={PrimeIcons.DOWNLOAD}
                        onClick={() => {
                           zipImages(processedImages, onImagesZipped)
                        }}
                     ></Button>
                     <p>
                        <span className="text-primary-700 text-2xl">
                           {processedImages.length}
                        </span>
                     </p>
                  </>
               }
               end={
                  <HelpButton size="large" iconSize="text-4xl" height="2.5rem">
                     Help me!
                  </HelpButton>
               }
            ></Toolbar>

            <Sidebar
               visible={showUploadPanel}
               fullScreen={true}
               onHide={() => {
                  setShowUploadPanel(false)
               }}
            >
               <FileUploadPanel />
            </Sidebar>

            <div className="grid m-0">
               <div className="col-12 sm:col-12 md:col-6 lg:col-5 xl:col-4">
                  <Settings />
               </div>
               <div className="col-12 sm:col-12 md:col-6 lg:col-7 xl:col-8">
                  <ImageProcessingPanel />
               </div>
            </div>
         </div>
      </div>
   )
}

export default App
