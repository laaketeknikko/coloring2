import { Button } from "primereact/button"
import {
   globalColoringSettingsAtom,
   processingQueueAtom,
   uploadedFilesAtom,
} from "../../atoms/atoms"
import { useAtom, useAtomValue } from "jotai"

const Colorer = () => {
   const uploadedFiles = useAtomValue(uploadedFilesAtom)
   const [processingQueue, setProcessingQueue] = useAtom(processingQueueAtom)
   const globalSettings = useAtomValue(globalColoringSettingsAtom)

   const runColoring = (event: React.SyntheticEvent) => {
      event?.preventDefault()

      const newQueue = [...processingQueue, ...uploadedFiles].map((image) => {
         return { ...image, settings: globalSettings }
      })

      setProcessingQueue(newQueue)
   }

   return (
      <div>
         <Button onClick={runColoring}>Add to queue</Button>
      </div>
   )
}

export { Colorer }
