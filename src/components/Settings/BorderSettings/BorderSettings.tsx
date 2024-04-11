import { useAtom } from "jotai"
import { globalBorderPatchingAtom } from "../../../atoms/atoms"
import { CustomInputNumber } from "../CustomInputNumber"
import { BorderColorPicker } from "./BorderColorPicker"

const BorderSettings = () => {
   const [borderPatching, setBorderPatching] = useAtom(globalBorderPatchingAtom)

   return (
      <>
         <BorderColorPicker />
         <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Patching</span>
            <CustomInputNumber
               value={borderPatching}
               inputId="border-color-patching"
               onChange={(event) => {
                  setBorderPatching(event)
               }}
            />
         </div>
      </>
   )
}

export { BorderSettings }
