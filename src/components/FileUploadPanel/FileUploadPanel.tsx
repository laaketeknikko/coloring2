import { ScrollPanel } from "primereact/scrollpanel"
import { FileInput } from "../FileInput/FileInput"

const FileUploadPanel = () => {
   return (
      <ScrollPanel style={{ width: "100%", height: "100vh" }}>
         <FileInput />
      </ScrollPanel>
   )
}

export { FileUploadPanel }
