import { ColoringSettingsColor } from "../../../utils/ColoringSettings"
import { RemoveButton } from "../../utils/RemoveButton"

export interface SingleColorSelectionColorProps {
   color: ColoringSettingsColor
   onRemove: (color: ColoringSettingsColor) => void
}

const SingleColorSelectionColor = ({
   color,
   onRemove,
}: SingleColorSelectionColorProps) => {
   const handleColorRemove = () => {
      onRemove(color)
   }

   return (
      <div
         className="border-round-lg border-2 border-solid border-900"
         style={{
            aspectRatio: "1/1",
            backgroundColor: `rgb(${color.color.r}, ${color.color.g}, ${color.color.b})`,
         }}
      >
         <div>
            <RemoveButton onRemove={handleColorRemove} id={color.id} />
         </div>
      </div>
   )
}

export { SingleColorSelectionColor }
