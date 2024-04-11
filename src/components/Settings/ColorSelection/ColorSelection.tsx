import { IColor } from "react-color-palette"
import { ColorerColorsPicker } from "../ColorerColorsPicker"

import "react-color-palette/css"
import { ScrollPanel } from "primereact/scrollpanel"
import { globalColoringColorsAtom } from "../../../atoms/atoms"
import { useAtom } from "jotai"
import { v4 } from "uuid"
import { ColorSelectionList } from "./ColorSelectionList"

const ColorSelection = () => {
   const [globalColorSettings, setGlobalColorSettings] = useAtom(
      globalColoringColorsAtom
   )

   const handleColorAdded = (color: IColor) => {
      setGlobalColorSettings([
         ...globalColorSettings,
         {
            color: {
               r: Math.floor(color.rgb.r),
               g: Math.floor(color.rgb.g),
               b: Math.floor(color.rgb.b),
               a: Math.floor(color.rgb.a),
            },
            id: v4(),
         },
      ])
   }

   return (
      <div className="grid">
         <div className="col-6 sm:col-7 md:col-4 lg:col-3 xl:col-3">
            <ColorerColorsPicker onSelectColor={handleColorAdded} />
         </div>
         <div className="col-6 sm:col-5 md:col-8 lg:col-9 xl:col-9">
            <ScrollPanel>
               <ColorSelectionList />
            </ScrollPanel>
         </div>
      </div>
   )
}

export { ColorSelection }
