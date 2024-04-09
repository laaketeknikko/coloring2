import { ScrollPanel } from "primereact/scrollpanel"
import { FileInput } from "../FileInput/FileInput"
import { ImageScroller } from "../ImageScroller"
import { uploadedFilesAtom } from "../../atoms/atoms"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

const FileUploadPanel = () => {
   const uploadedFiles = useAtomValue(uploadedFilesAtom)

   const images = useMemo(() => {
      return uploadedFiles.map((file) => file.image)
   }, [uploadedFiles])

   return (
      <>
         <ImageScroller images={images} />
         <ScrollPanel style={{ width: "100%", height: "100vh" }}>
            <FileInput />
         </ScrollPanel>
      </>
   )
}

export { FileUploadPanel }
