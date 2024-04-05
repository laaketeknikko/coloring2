import "primereact/resources/themes/saga-orange/theme.css"
import { FileInput } from "./components/FileInput/FileInput"
import { ScrollPanel } from "primereact/scrollpanel"
import { Colorer } from "./components/Colorer/Colorer"

function App() {
   return (
      <>
         <Colorer />

         <ScrollPanel style={{ width: "100%", height: "100vh" }}>
            <FileInput />
         </ScrollPanel>
      </>
   )
}

export default App

