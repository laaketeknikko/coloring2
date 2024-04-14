import { AlgorithmSelection } from "./AlgorithmSelection/AlgorithmSelection"
import { OutlineSettings } from "./BorderSettings/BorderSettings"
import { ColorSelection } from "./ColorSelection/ColorSelection"

const Settings = () => {
   return (
      <div className="grid justify-content-center">
         <div className="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 text-center">
            <div className="shadow-1">
               <AlgorithmSelection />
            </div>
            <div className="shadow-1">
               <p>Outline color settings</p>
               <OutlineSettings />
            </div>
         </div>
         <div className="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
            <ColorSelection />
         </div>
      </div>
   )
}

export { Settings }
