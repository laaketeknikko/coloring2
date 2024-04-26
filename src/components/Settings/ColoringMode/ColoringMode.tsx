import { Checkbox } from "primereact/checkbox"
import { globalColoringModeAtom } from "../../../atoms/atoms"
import { useAtom } from "jotai"

const ColoringMode = () => {
   const [coloringMode, setColoringMode] = useAtom(globalColoringModeAtom)

   return (
      <div>
         <p>Color mode</p>
         <div className="flex flex-column align-items-end">
            <label>
               Grayscale
               <Checkbox
                  checked={coloringMode === "grayscale"}
                  onChange={() => {
                     setColoringMode("grayscale")
                  }}
               />
            </label>
            <label>
               Black and white
               <Checkbox
                  checked={coloringMode === "bw"}
                  onChange={() => {
                     setColoringMode("bw")
                  }}
               />
            </label>
         </div>
      </div>
   )
}

export { ColoringMode }
