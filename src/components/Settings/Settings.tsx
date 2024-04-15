import { HelpButton } from "../../utils/HelpButton"
import { AlgorithmSelection } from "./AlgorithmSelection/AlgorithmSelection"
import { OutlineSettings } from "./BorderSettings/BorderSettings"
import { ColorSelection } from "./ColorSelection/ColorSelection"

const Settings = () => {
   return (
      <div className="grid justify-content-center">
         <div className="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 text-center">
            <div className="shadow-1 bg-teal-50">
               <AlgorithmSelection />
            </div>
            <div className="shadow-1 bg-teal-50">
               <p>
                  Outline color settings{" "}
                  <HelpButton size="small">
                     <p>Settings used when defining the areas to color.</p>
                     <p>Color: Color of the area outlines.</p>
                     <p>
                        Tolerance: Color difference tolerance of the outlines.
                        These values are added to and subtracted from the
                        outline color to create minimum and maximum boundaries.
                        If a color is within this tolerance, it is considered a
                        border color.
                     </p>
                     <p>
                        Patching: The distance in pixels from an outline pixel
                        up to which a pixel is considered an outline pixel. This
                        can be used to 'patch' small holes in broken outlines.
                        Note that using this also "indents" the coloring by the
                        same amount.
                     </p>
                  </HelpButton>
               </p>
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
