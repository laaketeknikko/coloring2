import { Button } from "primereact/button"
import { processedImagesAtom, uploadedFilesAtom } from "../../atoms/atoms"
import { useAtom, useAtomValue } from "jotai"
import { Galleria } from "primereact/galleria"
import { runColoring as runColorWork } from "./util/worker"

const Colorer = () => {
   const uploadedFiles = useAtomValue(uploadedFilesAtom)
   const [processedFiles, setProcessedFiles] = useAtom(processedImagesAtom)

   const runColoring = (event: React.SyntheticEvent) => {
      event?.preventDefault()
      console.log("running coloring with files: ", uploadedFiles)

      runColorWork(uploadedFiles)
   }
   console.log("uploadedFiles: ", uploadedFiles)
   return (
      <div>
         <p>Results</p>

         <Button onClick={runColoring}>Run coloring</Button>
      </div>
   )
}

export { Colorer }
