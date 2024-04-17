import { VirtualScroller } from "primereact/virtualscroller"
import { coloredImagesAtom } from "../../atoms/atoms"
import { useAtom } from "jotai"
import { ImageWithSettings } from "../../types/types"
import { useWindowSize } from "@uidotdev/usehooks"
import { primeFlexBreakPoints } from "../../config/config"
import { useMemo } from "react"

const ItemTemplate = (itemRow: Array<ImageWithSettings>) => {
   const row = []

   for (const item of itemRow) {
      row.push(
         <div
            className="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2"
            key={item.id}
         >
            <img
               src={item.imageData.dataUrl}
               className="w-full"
               style={{ aspectRatio: 1 }}
            />
         </div>
      )
   }

   return <div className="grid">{row}</div>
}

const NewGalleria = () => {
   const [coloredImages, setColoredImages] = useAtom(coloredImagesAtom)

   let { width } = useWindowSize()
   if (!width) {
      width = 0
   }

   const itemPerRow = useMemo(() => {
      if (width > primeFlexBreakPoints.xl) {
         return 5
      } else if (width > primeFlexBreakPoints.lg) {
         return 4
      } else if (width > primeFlexBreakPoints.md) {
         return 3
      } else if (width > primeFlexBreakPoints.sm) {
         return 2
      }

      return 1
   }, [width])

   const items = useMemo(() => {
      const newItems = []
      let row = []

      for (const image of coloredImages) {
         if (row.length < itemPerRow) {
            row.push(image)
         } else {
            newItems.push([...row])
            row = []
            row.push(image)
         }
      }

      // Add the last items.
      newItems.push(row)

      return newItems
   }, [coloredImages, itemPerRow])

   return (
      <div>
         <VirtualScroller
            scrollHeight="30rem"
            orientation="both"
            items={items}
            itemTemplate={ItemTemplate}
         ></VirtualScroller>
         <div>Some kind of image list</div>
      </div>
   )
}

export { NewGalleria }
