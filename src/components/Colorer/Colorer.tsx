import { Button } from "primereact/button"
import { uploadedFilesAtom } from "../../atoms/atoms"
import { useAtomValue } from "jotai"

const Colorer = () => {
   const uploadedFiles = useAtomValue(uploadedFilesAtom)

   const runColoring = (event: React.SyntheticEvent) => {
      event?.preventDefault()
      console.log("running coloring with files: ", uploadedFiles)
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
