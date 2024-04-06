import { useAtom } from "jotai"
import {
   newestProcessedImageAtom,
   processedImagesAtom,
   uploadedFilesAtom,
} from "../../atoms/atoms"

import { runColoring } from "../Colorer/util/worker"
import { useEffect, useState } from "react"

const ColoringProcessor = () => {
   const [uploadedFiles, setUploadedFiles] = useAtom(uploadedFilesAtom)
   const [processedFiles, setProcessedFiles] = useAtom(processedImagesAtom)
   const [newestImage, setNewestImage] = useAtom(newestProcessedImageAtom)

   const [coloringRunning, setColoringRunning] = useState(false)

   useEffect(() => {
      if (uploadedFiles.length > 0 && !coloringRunning) {
         setColoringRunning(true)
         setNewestImage(null)
         runColoring(uploadedFiles[0])
      }
   }, [coloringRunning, setNewestImage, uploadedFiles])

   useEffect(() => {
      if (newestImage && coloringRunning) {
         setProcessedFiles([...processedFiles, newestImage])
         uploadedFiles.shift()
         setUploadedFiles([...uploadedFiles])
         setColoringRunning(false)
      }
   }, [
      coloringRunning,
      newestImage,
      processedFiles,
      setProcessedFiles,
      setUploadedFiles,
      uploadedFiles,
   ])

   return null
}

export { ColoringProcessor }
