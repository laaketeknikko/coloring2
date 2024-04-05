import { useAtomValue } from "jotai"
import { processedImagesAtom } from "../../atoms/atoms"
import { Galleria } from "primereact/galleria"

const CustomGalleria = () => {
   const processedImages = useAtomValue(processedImagesAtom)

   return <Galleria></Galleria>
}

export { CustomGalleria }
