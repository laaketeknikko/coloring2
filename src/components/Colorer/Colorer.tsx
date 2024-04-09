import { Button } from "primereact/button"
import { processingQueueAtom, uploadedFilesAtom } from "../../atoms/atoms"
import { useAtomValue, useSetAtom } from "jotai"

const Colorer = () => {
   const uploadedFiles = useAtomValue(uploadedFilesAtom)
   const setProcessingQueue = useSetAtom(processingQueueAtom)

   const runColoring = (event: React.SyntheticEvent) => {
      event?.preventDefault()

      console.log("starting processing with uploaded files: ", uploadedFiles)
      setProcessingQueue([...uploadedFiles])
   }

   return (
      <div>
         <Button onClick={runColoring}>Run coloring</Button>
      </div>
   )
}

export { Colorer }
