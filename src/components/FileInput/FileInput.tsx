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
import { ImageWithSettings } from "../../types/types"
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
   const handleUpload = async () => {
      const images = await imagesFromFiles(selectedFiles)

      const imagesWithSettings: Array<ImageWithSettings> = images.map(
         (image, index) => {
            return {
               imageData: {
                  meta: {
                     name: selectedFiles[index].name,
                  },
                  image: image,
                  dataUrl: image.toDataURL(),
               },
               settings: { ...globalColoringSettings },
               id: v4(),
            }
         }
      )

      console.log("setting the shit")

      setUploadedFiles([...uploadedFiles, ...imagesWithSettings])
      setProcessingQueue([...processingQueue, ...imagesWithSettings])
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
            uploadHandler={() => {
               // eslint-disable-next-line no-extra-semi
               ;() => {
                  void (async () => {
                     await handleUpload()
                  })()
               }
            }}
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
