import { useAtom } from "jotai"
import {
   newestProcessedImageAtom,
   processedImagesAtom,
   processingQueueAtom,
} from "../../atoms/atoms"

import { runColoring } from "../Colorer/util/worker"
import { useEffect, useState } from "react"

const ColoringProcessor = () => {
   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)
   const [processedFiles, setProcessedFiles] = useAtom(processedImagesAtom)
   const [newestImage, setNewestImage] = useAtom(newestProcessedImageAtom)

   const [coloringRunning, setColoringRunning] = useState(false)

   useEffect(() => {
      if (processingQueue.length > 0 && !coloringRunning) {
         setColoringRunning(true)
         setNewestImage(null)
         runColoring(processingQueue[0])
      }
   }, [coloringRunning, setNewestImage, processingQueue])

   useEffect(() => {
      if (newestImage && coloringRunning) {
         setProcessedFiles([...processedFiles, newestImage])
         processingQueue.shift()
         setProcessingQueue([...processingQueue])
         setColoringRunning(false)
      }
   }, [
      coloringRunning,
      newestImage,
      processedFiles,
      setProcessedFiles,
      setProcessingQueue,
      processingQueue,
   ])

   return null
}

export { ColoringProcessor }
