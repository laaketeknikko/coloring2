import "primereact/resources/themes/saga-orange/theme.css"
import { ImageProcessingPanel } from "./components/ImageProcessingPanel/ImageProcessingPanel"
import { FileUploadPanel } from "./components/FileUploadPanel/FileUploadPanel"

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
import { MainHelp } from "./Help/MainHelp"

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

   const [displayHelp, setDisplayHelp] = useState(false)

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
                  <>
                     <Button
                        onClick={() => {
                           setDisplayHelp(true)
                        }}
                        style={{
                           aspectRatio: 1,
                           height: "2.5rem",
                           width: "2.5rem",
                        }}
                        size={"large"}
                        className={`border-circle bg-blue-200 border-0 p-1`}
                        icon={`${PrimeIcons.INFO_CIRCLE} text-4xl text-white`}
                     ></Button>
                  </>
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

            <div>
               <ImageProcessingPanel />
            </div>

            <Sidebar
               className="bg-yellow-50 h-screen"
               visible={displayHelp}
               fullScreen={true}
               onHide={() => {
                  setDisplayHelp(false)
               }}
            >
               <div className=" h-screen">
                  <MainHelp />
               </div>
            </Sidebar>
         </div>
      </div>
   )
}

export default App
