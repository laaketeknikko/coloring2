import { Panel, PanelHeaderTemplateOptions } from "primereact/panel"

import { processedImagesAtom, uploadedImagesAtom } from "../../atoms/atoms"
import { useAtom } from "jotai"
import { ImageList } from "./ImageList"
import { TabPanel, TabView } from "primereact/tabview"
import { useRef, useState } from "react"
import { Button } from "primereact/button"
import { PrimeIcons } from "primereact/api"

const ImageViewer = () => {
   const [uploadedImages, setUploadedImages] = useAtom(uploadedImagesAtom)
   const [coloredImages, setColoredImages] = useAtom(processedImagesAtom)

   const [collapsed, setCollapsed] = useState(true)

   const panelRef = useRef<Panel>(null)

   const headerTemplate = (options: PanelHeaderTemplateOptions) => {
      return (
         <div>
            <div>
               <Button
                  onClick={(e) => {
                     panelRef.current?.toggle(e)
                     setCollapsed(!collapsed)
                  }}
                  icon={`${collapsed ? PrimeIcons.PLUS : PrimeIcons.MINUS}`}
               ></Button>
               <Button>Queue uploaded</Button>
               <Button>Queue colored</Button>
            </div>
         </div>
      )
   }

   console.log("Uploaded imgaes in imageviewer: ", uploadedImages)

   return (
      <Panel
         ref={panelRef}
         headerTemplate={headerTemplate}
         toggleable
         collapsed={collapsed}
      >
         <TabView>
            <TabPanel header="Uploaded images">
               <div className="h-screen">
                  <ImageList images={uploadedImages} />
               </div>
            </TabPanel>
            <TabPanel header="Colored images">
               <div className="h-screen">
                  <ImageList images={coloredImages} />
               </div>
            </TabPanel>
         </TabView>
      </Panel>
   )
}

export { ImageViewer }
