import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload"
import { useAtom, useSetAtom } from "jotai"
import { selectedFilesAtom, uploadedFilesAtom } from "../../atoms/atoms"
import { useEffect, useRef } from "react"
import { imagesFromFiles } from "../../utils/imageUtils"
import { ColoringSettings } from "../../utils/ColoringSettings"

const FileInput = () => {
   const [selectedFiles, setSelectedFiles] = useAtom(selectedFilesAtom)

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

      console.log("images in handleupload: ", images)

      const imagesWithSettings = images.map((image) => {
         return { image: image, settings: new ColoringSettings() }
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
