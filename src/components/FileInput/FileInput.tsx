import { useState } from "react"

import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload"
import { useSetAtom } from "jotai"
import { uploadedFilesAtom } from "../../atoms/atoms"

const FileInput = () => {
   const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])

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

   const handleUpload = () => {
      setUploadedFiles([...selectedFiles])
   }

   return (
      <div>
         <FileUpload
            accept="image/*"
            customUpload
            uploadHandler={handleUpload}
            multiple
            mode="advanced"
            onSelect={handleFileChange}
            previewWidth={200}
         />
      </div>
   )
}

export { FileInput }
