import { IColor } from "react-color-palette"
import { ColorerColorsPicker } from "../ColorerColorsPicker"

import "react-color-palette/css"
import { ScrollPanel } from "primereact/scrollpanel"
import { globalColoringColorsAtom } from "../../../atoms/atoms"
import { useAtom } from "jotai"
import { v4 } from "uuid"
import { ColorSelectionList } from "./ColorSelectionList"
import { HelpButton } from "../../../utils/HelpButton"

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
         <div className="col-12 text-center">
            Color settings{" "}
            <HelpButton size="small">
               <div className="max-w-30rem">
                  <p>
                     Here you can add colors to be used when coloring the image.
                  </p>
                  <p>
                     If no colors are selected, random colors will be used. If
                     colors are specified, they will be used either randomly or
                     according to the area number or area size algorithm
                     settings.
                  </p>
                  <p>
                     Each color has a threshold percent value. This will have an
                     effect if the area number or area size algorithm is
                     selected. For area size: the color will be used if the area
                     proportion compared to the total of all areas is greater
                     than the threshold. For area number: the color will be used
                     if the area is larger than the percentage compared to all
                     areas.
                  </p>
               </div>
            </HelpButton>
         </div>
         <div className="col-6 sm:col-4 md:col-5 lg:col-4 xl:col-4">
            <ColorerColorsPicker onSelectColor={handleColorAdded} />
         </div>
         <div className="col-6 sm:col-8 md:col-7 lg:col-8 xl:col-8">
            <ScrollPanel>
               <ColorSelectionList />
            </ScrollPanel>
         </div>
      </div>
   )
}

export { ColorSelection }
