import { ScrollPanel } from "primereact/scrollpanel"
import { FileInput } from "../FileInput/FileInput"
import { ImageScroller } from "../ImageScroller"
import { uploadedFilesAtom } from "../../atoms/atoms"
import { useAtomValue } from "jotai"

const FileUploadPanel = () => {
   const uploadedFiles = useAtomValue(uploadedFilesAtom)

   return (
      <>
         <ImageScroller images={uploadedFiles} />
         <ScrollPanel style={{ width: "100%", height: "100vh" }}>
            <FileInput />
         </ScrollPanel>
      </>
   )
}

export { FileUploadPanel }
