import "primereact/resources/themes/saga-orange/theme.css"
import { FileInput } from "./components/FileInput/FileInput"
import { ScrollPanel } from "primereact/scrollpanel"
import { Colorer } from "./components/Colorer/Colorer"
import { CustomGalleria } from "./components/Galleria/CustomGalleria"
import { ColoringProcessor } from "./components/ColoringProcessor/ColoringProcessor"

function App() {
   return (
      <>
         <Colorer />
         <CustomGalleria />
         <ColoringProcessor />

         <ScrollPanel style={{ width: "100%", height: "100vh" }}>
            <FileInput />
         </ScrollPanel>
      </>
   )
}

export default App

