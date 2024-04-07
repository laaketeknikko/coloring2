import { BorderColorPicker } from "./BorderColorPicker"

const Settings = () => {
   return (
      <div className="grid">
         <div className="col-5 sm:col-4 md:col-3 lg:col-2 xl:col-2">
            <BorderColorPicker />
         </div>
      </div>
   )
}

export { Settings }
