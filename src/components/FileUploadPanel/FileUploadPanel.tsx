import { ScrollPanel } from "primereact/scrollpanel"
import { FileInput } from "../FileInput/FileInput"
import { ImageScroller } from "../ImageScroller"
import { uploadedImagesAtom } from "../../atoms/atoms"
import { useAtom } from "jotai"

const FileUploadPanel = () => {
   const [uploadedFiles, setUploadedFiles] = useAtom(uploadedImagesAtom)

   const handleImageRemove = (id: string) => {
      setUploadedFiles(uploadedFiles.filter((image) => image.id !== id))
   }

   return (
      <>
         <div style={{ height: "18vh" }}>
            <ImageScroller
               images={uploadedFiles}
               onImageRemove={handleImageRemove}
            />
         </div>

         <ScrollPanel style={{ width: "100%" }}>
            <FileInput />
         </ScrollPanel>
      </>
   )
}

export { FileUploadPanel }
