import { useSetAtom } from "jotai"
import { globalBorderPatchingAtom } from "../../../atoms/atoms"
import { CustomInputNumber } from "../CustomInputNumber"
import { BorderColorPicker } from "./BorderColorPicker"

const BorderSettings = () => {
   const setBorderPathing = useSetAtom(globalBorderPatchingAtom)

   return (
      <>
         <BorderColorPicker />
         <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Patching</span>
            <CustomInputNumber
               value={0}
               inputId="border-color-patching"
               onChange={(event) => {
                  setBorderPathing(event)
               }}
            />
         </div>
      </>
   )
}

export { BorderSettings }
