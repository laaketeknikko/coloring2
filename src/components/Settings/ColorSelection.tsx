import { IColor } from "react-color-palette"
import { ColorerColorsPicker } from "./ColorerColorsPicker"
import { useMemo, useState } from "react"

import "react-color-palette/css"

const ColorSelection = () => {
   const [selectedColors, setSelectedColors] = useState<Array<IColor>>([])

   const handleColorAdded = (color: IColor) => {
      setSelectedColors([...selectedColors, color])
   }

   const colorElements = useMemo(() => {
      return selectedColors.map((color, index) => {
         return (
            <div className="col-4 sm:col-12 md:col-4 lg:col-3 xl:col-2">
               <div
                  className="border-round-lg border-2 border-solid border-900"
                  key={`${color.hex}-${index}`}
                  style={{
                     aspectRatio: "1/1",
                     backgroundColor: color.hex,
                  }}
               ></div>
            </div>
         )
      })
   }, [selectedColors])

   return (
      <div className="grid">
         <div className="col-6 sm:col-7 md:col-4 lg:col-3 xl:col-3">
            <ColorerColorsPicker onSelectColor={handleColorAdded} />
         </div>
         <div className="col-6 sm:col-5 md:col-8 lg:col-9 xl:col-9">
            <div className="grid">{colorElements}</div>
         </div>
      </div>
   )
}

export { ColorSelection }
