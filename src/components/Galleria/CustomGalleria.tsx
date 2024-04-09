import { useAtomValue } from "jotai"
import { Galleria } from "primereact/galleria"
import { processedImagesAtom } from "../../atoms/atoms"
import { useMemo, useState } from "react"
import { Button } from "primereact/button"

import { PrimeIcons } from "primereact/api"
import { Sidebar } from "primereact/sidebar"

const CustomGalleria = () => {
   const processedImages = useAtomValue(processedImagesAtom)

   const dataUrls = useMemo(() => {
      const newUrls: Array<string> = []
      for (const item of processedImages) {
         newUrls.push(item.imageData.dataUrl)
      }

      return newUrls
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

   const [fullScreenGallery, setFullScreenGallery] = useState(false)

   const galleria = useMemo(() => {
      return (
         <Galleria
            indicatorsPosition="top"
            changeItemOnIndicatorHover={true}
            showIndicators={true}
            thumbnailsPosition="top"
            value={dataUrls}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
         />
      )
   }, [dataUrls])

   return (
      <>
         <Button
            icon={`${PrimeIcons.WINDOW_MAXIMIZE}`}
            onClick={() => {
               setFullScreenGallery(true)
            }}
         ></Button>
         {fullScreenGallery && (
            <Sidebar
               visible={true}
               fullScreen
               onHide={() => setFullScreenGallery(false)}
            >
               {galleria}
            </Sidebar>
         )}
         {!fullScreenGallery && galleria}
      </>
   )
}

export { CustomGalleria }
