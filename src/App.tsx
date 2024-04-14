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
   globalColoringSettingsAtom,
   processedImagesAtom,
   processingQueueAtom,
   uploadedFilesAtom,
} from "./atoms/atoms"
import { useAtom } from "jotai"
import { zipImages } from "./utils/zipping"
import { FlateCallback } from "fflate"

function App() {
   const [showUploadPanel, setShowUploadPanel] = useState(false)

   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)
   const [uploadedFiles] = useAtom(uploadedFilesAtom)
   const [processedImages] = useAtom(processedImagesAtom)
   const [globalSettings] = useAtom(globalColoringSettingsAtom)

   const runColoring = (event: React.SyntheticEvent) => {
      event?.preventDefault()

      const newQueue = [...processingQueue, ...uploadedFiles].map((image) => {
         return { ...image, settings: globalSettings }
      })

      setProcessingQueue(newQueue)
   }

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
         <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <Toolbar
               start={
                  <>
                     <Button
                        className="m-1 border-circle"
                        icon={`${PrimeIcons.UPLOAD}`}
                        onClick={() => setShowUploadPanel(true)}
                     />
                     <span className="text-primary-700 text-2xl">
                        {uploadedFiles.length}
                     </span>
                  </>
               }
               center={
                  <>
                     <p className="">
                        <span className="text-primary-700 text-2xl">
                           {uploadedFiles.length} ({processingQueue.length})
                        </span>
                     </p>

                     <Button
                        className="m-1 border-circle"
                        icon={`${PrimeIcons.PLAY}`}
                        onClick={runColoring}
                     ></Button>

                     <Button
                        className="m-1 border-circle"
                        icon={`${PrimeIcons.DOWNLOAD}`}
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
                  <Button
                     style={{ aspectRatio: 1 }}
                     size="large"
                     className="border-circle bg-blue-200 border-0"
                     icon={`${PrimeIcons.INFO_CIRCLE} text-2xl text-white`}
                  ></Button>
               }
            ></Toolbar>

            <Sidebar
               visible={showUploadPanel}
               fullScreen={true}
               onHide={() => setShowUploadPanel(false)}
            >
               <FileUploadPanel />
            </Sidebar>

            <div className="grid">
               <div className="col-12 sm:col-12 md:col-6 lg:col-5 xl:col-4">
                  <Settings />
               </div>
               <div className="col-12 sm:col-12 md:col-6 lg:col-7 xl:col-8">
                  <ImageProcessingPanel />
               </div>
            </div>

            {/*
         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <TabView>
               <TabPanel
                  header="Add files"
                  leftIcon={`${PrimeIcons.UPLOAD} mr-2`}
               >
                  <FileUploadPanel />
               </TabPanel>
               <TabPanel header="Settings" leftIcon={`${PrimeIcons.COG} mr-2`}>
                  <Settings />
               </TabPanel>
               <TabPanel header="Coloring" leftIcon={`${PrimeIcons.PLAY} mr-2`}>
                  <div style={{ height: "70vh" }}>
                     <ImageProcessingPanel />
                  </div>
               </TabPanel>
            </TabView>
         </div>
*/}
         </div>
      </>
   )
}

export default App
