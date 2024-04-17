import { useAtom } from "jotai"
import {
   globalColoringSettingsAtom,
   isProcessingPausedAtom,
   newestProcessedImageAtom,
   processedImagesAtom,
   processingQueueAtom,
} from "../../atoms/atoms"

import { runColoring } from "../Colorer/util/worker"
import { useEffect, useState } from "react"
import { v4 } from "uuid"

const ColoringProcessor = () => {
   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)
   const [processedFiles, setProcessedFiles] = useAtom(processedImagesAtom)
   const [newestImage, setNewestImage] = useAtom(newestProcessedImageAtom)
   const [isProcessingPaused] = useAtom(isProcessingPausedAtom)
   const [globalSettings] = useAtom(globalColoringSettingsAtom)

   const [coloringRunning, setColoringRunning] = useState(false)

   useEffect(() => {
      if (
         processingQueue.length > 0 &&
         !coloringRunning &&
         !isProcessingPaused
      ) {
         setColoringRunning(true)
         setNewestImage(null)
         runColoring({ ...processingQueue[0], settings: globalSettings })
      }
   }, [
      coloringRunning,
      globalSettings,
      isProcessingPaused,
      processingQueue,
      setNewestImage,
   ])

   useEffect(() => {
      if (newestImage && coloringRunning) {
         setProcessedFiles([...processedFiles, { ...newestImage, id: v4() }])
         processingQueue.shift()
         setProcessingQueue([...processingQueue])
         setColoringRunning(false)
      }
   }, [
      coloringRunning,
      newestImage,
      processedFiles,
      processingQueue,
      setProcessedFiles,
      setProcessingQueue,
   ])

   return null
}

export { ColoringProcessor }
