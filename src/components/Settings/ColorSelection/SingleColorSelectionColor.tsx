import { Button } from "primereact/button"
import { ColoringSettingsColor } from "../../../utils/ColoringSettings"
import { PrimeIcons } from "primereact/api"

export interface SingleColorSelectionColorProps {
   color: ColoringSettingsColor
   onRemove: (color: ColoringSettingsColor) => void
}

const SingleColorSelectionColor = ({
   color,
   onRemove,
}: SingleColorSelectionColorProps) => {
   return (
      <div
         className="border-round-lg border-2 border-solid border-900"
         style={{
            aspectRatio: "1/1",
            backgroundColor: `rgb(${color.color.r}, ${color.color.g}, ${color.color.b})`,
         }}
      >
         <div>
            <Button
               className="bg-black-alpha-40 border-none text-primary p-1"
               icon={`${PrimeIcons.TIMES} text-xl font-light`}
               onClick={() => onRemove(color)}
            ></Button>
         </div>
      </div>
   )
}

export { SingleColorSelectionColor }
