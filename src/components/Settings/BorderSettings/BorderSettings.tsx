import { useAtom } from "jotai"
import { globalBorderPatchingAtom } from "../../../atoms/atoms"
import { CustomInputNumber } from "../CustomInputNumber"
import { BorderColorPicker } from "./BorderColorPicker"

const OutlineSettings = () => {
   const [borderPatching, setBorderPatching] = useAtom(globalBorderPatchingAtom)

   return (
      <>
         <div className="text-center justify-content-center">
            <div className="max-w-16rem m-auto">
               <BorderColorPicker />
               <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-1">Patching</span>
                  <CustomInputNumber
                     tooltipOptions={{ position: "right" }}
                     tooltip="The pixel distance from an outline pixel up to which a pixel is considered an outline pixel.
            
            This can be used to 'patch' small holes in broken outlines.
            
            Note: These pixels are not colored."
                     value={borderPatching}
                     inputId="border-color-patching"
                     onChange={(event) => {
                        setBorderPatching(event)
                     }}
                  />
               </div>
            </div>
         </div>
      </>
   )
}

export { OutlineSettings }
