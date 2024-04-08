import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import {
   globalColoringSettingsAtom,
   selectedFilesAtom,
   uploadedFilesAtom,
} from "../../atoms/atoms"
import { useEffect, useRef } from "react"
import { imagesFromFiles } from "../../utils/imageUtils"

const FileInput = () => {
   const [selectedFiles, setSelectedFiles] = useAtom(selectedFilesAtom)

   const globalColoringSettings = useAtomValue(globalColoringSettingsAtom)

   const setUploadedFiles = useSetAtom(uploadedFilesAtom)

   const handleFileChange = (event: FileUploadSelectEvent) => {
      const fileList: Array<File> = []

      for (const file of event.files) {
         if (file.type.startsWith("image")) {
            fileList.push(file)
         }
      }

      setSelectedFiles(fileList)
   }

   const handleUpload = async () => {
      const images = await imagesFromFiles(selectedFiles)

      const imagesWithSettings = images.map((image) => {
         return { image: image, settings: { ...globalColoringSettings } }
      })

      setUploadedFiles(imagesWithSettings)
      setSelectedFiles([])
   }

   const fileUploadRef = useRef<FileUpload>(null)

   useEffect(() => {
      if (fileUploadRef.current) {
         fileUploadRef.current.setFiles(selectedFiles)
      }
   })

   return (
      <div>
         <FileUpload
            ref={fileUploadRef}
            accept="image/*"
            customUpload
            uploadHandler={handleUpload}
            multiple
            mode="advanced"
            onSelect={handleFileChange}
            onClear={() => setSelectedFiles([])}
            previewWidth={200}
            uploadLabel="Add"
         />
      </div>
   )
}

export { FileInput }
