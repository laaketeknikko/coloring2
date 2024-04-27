import { Checkbox } from "primereact/checkbox"
import { globalShadingModeAtom } from "../../../atoms/atoms"
import { useAtom } from "jotai"

const ColoringMode = () => {
   const [coloringMode, setColoringMode] = useAtom(globalShadingModeAtom)

   return (
      <div>
         <p>Shading mode</p>
         <div className="flex flex-column align-items-end">
            <label>
               Black and white
               <Checkbox
                  checked={coloringMode === "bw"}
                  onChange={() => {
                     setColoringMode("bw")
                  }}
               />
            </label>

            <label>
               Pixel lightness
               <Checkbox
                  checked={coloringMode === "lightness"}
                  onChange={() => {
                     setColoringMode("lightness")
                  }}
               />
            </label>

            <label>
               Pixel transparency
               <Checkbox
                  checked={coloringMode === "transparency"}
                  onChange={() => {
                     setColoringMode("transparency")
                  }}
               />
            </label>
         </div>
      </div>
   )
}

export { ColoringMode }
