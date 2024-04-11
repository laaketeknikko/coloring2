import "primereact/resources/themes/saga-orange/theme.css"
import { ImageProcessingPanel } from "./components/ImageProcessingPanel/ImageProcessingPanel"
import { FileUploadPanel } from "./components/FileUploadPanel/FileUploadPanel"
import { Settings } from "./components/Settings/Settings"
import { TabPanel, TabView } from "primereact/tabview"

import { PrimeIcons } from "primereact/api"

function App() {
   return (
      <>
         <TabView>
            <TabPanel header="Add files" leftIcon={`${PrimeIcons.UPLOAD} mr-2`}>
               <FileUploadPanel />
            </TabPanel>
            <TabPanel header="Settings" leftIcon={`${PrimeIcons.COG} mr-2`}>
               <Settings />
            </TabPanel>
            <TabPanel header="Coloring" leftIcon={`${PrimeIcons.PLAY} mr-2`}>
               <ImageProcessingPanel />
            </TabPanel>
         </TabView>
      </>
   )
}

export default App
