import { Checkbox } from "primereact/checkbox"
import { globalShadingModeAtom } from "../../../atoms/atoms"
import { useAtom } from "jotai"
import { HelpButton } from "../../../utils/HelpButton"

const ShadingMode = () => {
   const [coloringMode, setColoringMode] = useAtom(globalShadingModeAtom)

   return (
      <div>
         <p>
            Shading mode
            <HelpButton size="small">
               <div>
                  <p>
                     <strong>No shading</strong>: Mapped areas are colored with
                     an even color.
                  </p>
                  <p>
                     <strong>Pixel lightness</strong>: Reads the color value of
                     pixels as HSV and applies the lightness value to the paint
                     color. Darker areas will have darker colors.
                  </p>
                  <p>
                     <strong>Pixel transparency</strong>: Reads the color value
                     of pixels and uses the lightness as transparency for the
                     paint color. Darker areas will have more opacity, lighter
                     areas more transparency.
                  </p>
               </div>
            </HelpButton>
         </p>
         <div className="flex flex-column align-items-end">
            <label>
               No shading
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

export { ShadingMode }
