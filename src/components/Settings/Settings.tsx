import { BorderColorPicker } from "./BorderColorPicker"
import { CustomColorInput } from "./CustomColorInput"

const Settings = () => {
   return (
      <div className="grid">
         <div className="col-5 sm:col-4 md:col-3 lg:col-2 xl:col-2">
            <BorderColorPicker />
         </div>
         <div className="col-7 sm:col-7 md:col-7 lg:col-7 xl:col-7">
            <CustomColorInput />
         </div>
      </div>
   )
}

export { Settings }
