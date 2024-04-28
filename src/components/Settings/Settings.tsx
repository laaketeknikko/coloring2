import { HelpButton } from "../../utils/HelpButton"
import { AlgorithmOptions } from "./AlgorithmSelection/AlgorithmOptions"
import { OutlineSettings } from "./OutlineSettings/OutlineSettings"
import { ColorSelection } from "./ColorSelection/ColorSelection"
import { ShadingMode } from "./ColoringMode/ShadingMode"

const Settings = () => {
   return (
      <div className="grid justify-content-center border-round-lg shadow p-0 m-0">
         <div className="border-round-2xl col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 text-center">
            <div className="border-round-2xl shadow bg-teal-50 grid justify-content-center">
               <div className="border-round-xl col-6 sm:col-5 md:col-4 lg:col-3 xl:col-2 shadow bg-green-50 ">
                  <p>
                     Outline color settings{" "}
                     <HelpButton size="small">
                        <p>Settings used when defining the areas to color.</p>
                        <p>
                           <strong>Color</strong>: Color of the area outlines.
                        </p>
                        <p>
                           <strong>Tolerance</strong>: Color difference
                           tolerance of the outlines. These values are added to
                           and subtracted from the outline color to create
                           minimum and maximum boundaries. If a color is within
                           this tolerance, it is considered a border color.
                        </p>
                        <p>
                           <strong>Margin</strong>: The distance to leave
                           between an outline and the coloring. This can also be
                           used to &apos;patch&apos; small holes in broken
                           outlines. Note that using this also
                           &apos;ndents&apos; the coloring by the same amount.
                        </p>
                     </HelpButton>
                  </p>
                  <OutlineSettings />
                  <ShadingMode />
               </div>
               <div className="border-round-xl col-6 sm:col-5 md:col-4 lg:col-3 xl:col-2 shadow bg-green-50">
                  <AlgorithmOptions />
               </div>
            </div>
         </div>
         <div className="shadow border-round-xl col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
            <ColorSelection />
         </div>
      </div>
   )
}

export { Settings }
