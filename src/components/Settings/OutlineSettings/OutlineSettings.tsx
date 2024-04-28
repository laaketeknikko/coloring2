import { useAtom } from "jotai"
import { globalBorderPatchingAtom } from "../../../atoms/atoms"
import { CustomInputNumber } from "../CustomInputNumber"
import { OutlineColorPicker } from "./OutlineColorPicker"

const OutlineSettings = () => {
   const [borderPatching, setBorderPatching] = useAtom(globalBorderPatchingAtom)

   return (
      <>
         <div className="text-center justify-content-center">
            <div className="max-w-16rem m-auto">
               <OutlineColorPicker />
               <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-1 bg-teal-50">
                     Patching
                  </span>
                  <CustomInputNumber
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
