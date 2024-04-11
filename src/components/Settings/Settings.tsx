import { BorderSettings } from "./BorderSettings/BorderSettings"
import { ColorSelection } from "./ColorSelection/ColorSelection"

const Settings = () => {
   return (
      <div className="grid">
         <div className="col-5 sm:col-4 md:col-3 lg:col-2 xl:col-2">
            <BorderSettings />
         </div>
         <div className="col-7 sm:col-8 md:col-9 lg:col-10 xl:col-10">
            <ColorSelection />
         </div>
      </div>
   )
}

export { Settings }
