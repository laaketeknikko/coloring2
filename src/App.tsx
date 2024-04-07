import "primereact/resources/themes/saga-orange/theme.css"
import { ImageProcessingPanel } from "./components/ImageProcessingPanel/ImageProcessingPanel"
import { FileUploadPanel } from "./components/FileUploadPanel/FileUploadPanel"
import { useMemo, useState } from "react"
import { Sidebar } from "primereact/sidebar"
import { Menubar } from "primereact/menubar"
import { Settings } from "./components/Settings/Settings"

function App() {
   const [showUploadPanel, setShowUploadPanel] = useState(false)

   const menuBarItems = useMemo(() => {
      return [
         {
            label: "Add files",
            icon: "pi pi-file-plus",
            command: () => setShowUploadPanel(true),
         },
      ]
   }, [])

   return (
      <>
         <Menubar model={menuBarItems} />

         <Settings />
         <ImageProcessingPanel />

         <Sidebar
            visible={showUploadPanel}
            onHide={() => setShowUploadPanel(false)}
            style={{ width: "80%", height: "100vh" }}
         >
            <FileUploadPanel />
         </Sidebar>
      </>
   )
}

export default App

