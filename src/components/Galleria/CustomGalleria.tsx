import { useAtomValue } from "jotai"
import { Galleria } from "primereact/galleria"
import { processedImagesAtom } from "../../atoms/atoms"
import { useEffect, useState } from "react"

const CustomGalleria = () => {
   const processedImages = useAtomValue(processedImagesAtom)
   const [dataUrls, setDataUrls] = useState<Array<string>>([])

   useEffect(() => {
      const newUrls: Array<string> = []
      for (const image of processedImages) {
         console.log("image in customgalleria: ", image)
         newUrls.push(image.toDataURL("image/png"))
      }

      setDataUrls(newUrls)
   }, [processedImages])

   const itemTemplate = (item: string) => {
      return (
         <img
            src={item}
            alt={item}
            style={{ maxWidth: "100%", maxHeight: "100vh" }}
         />
      )
   }

   const thumbnailTemplate = (item: string) => {
      return <img src={item} alt={item} style={{ height: "200px" }} />
   }

   return (
      <Galleria
         value={dataUrls}
         item={itemTemplate}
         thumbnail={thumbnailTemplate}
      />
   )
}

export { CustomGalleria }
