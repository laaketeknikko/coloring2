import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload"
import { useAtom, useAtomValue } from "jotai"
import {
   globalColoringSettingsAtom,
   processingQueueAtom,
   selectedFilesAtom,
   uploadedImagesAtom,
} from "../../atoms/atoms"
import { useEffect, useRef } from "react"
import { imagesFromFiles } from "../../utils/imageUtils"
import { v4 } from "uuid"

const FileInput = () => {
   const [selectedFiles, setSelectedFiles] = useAtom(selectedFilesAtom)

   const globalColoringSettings = useAtomValue(globalColoringSettingsAtom)

   const [uploadedFiles, setUploadedFiles] = useAtom(uploadedImagesAtom)
   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)

   const handleFileChange = (event: FileUploadSelectEvent) => {
      const fileList: Array<File> = []

      for (const file of event.files) {
         if (file.type.startsWith("image")) {
            fileList.push(file)
         }
      }

      setSelectedFiles(fileList)
   }

   // TODO: Turn to non-await
   const handleUpload = () => {
      imagesFromFiles(selectedFiles)
         .then((images) => {
            const imagesWithSettings = images.map((image, index) => {
               return {
                  imageData: {
                     meta: {
                        name: selectedFiles[index].name,
                     },
                     image,
                     dataUrl: image.toDataURL(),
                  },
                  settings: { ...globalColoringSettings },
                  id: v4(),
               }
            })

            setUploadedFiles(uploadedFiles.concat(imagesWithSettings))
            setProcessingQueue(processingQueue.concat(imagesWithSettings))
            setSelectedFiles([])
         })
         .catch((error: unknown) => {
            console.log(error)
         })
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
            onClear={() => {
               setSelectedFiles([])
            }}
            previewWidth={200}
            uploadLabel="Add"
         />
      </div>
   )
}

export { FileInput }
