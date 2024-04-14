import { AlgorithmSelection } from "./AlgorithmSelection/AlgorithmSelection"
import { BorderSettings } from "./BorderSettings/BorderSettings"
import { ColorSelection } from "./ColorSelection/ColorSelection"

const Settings = () => {
   return (
      <div className="grid">
         <div className="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
            <AlgorithmSelection />
            <BorderSettings />
         </div>
         <div className="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
            <ColorSelection />
         </div>
      </div>
   )
}

export { Settings }
