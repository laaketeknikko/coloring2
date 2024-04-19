import { Button } from "primereact/button"
import { ColorPicker, IColor, useColor } from "react-color-palette"
import { RGBToHex } from "../../../utils/imageUtils"
import { ColoringSettingsColor } from "../../../utils/ColoringSettings"

export interface ColorerColorsPickerProps {
   color: ColoringSettingsColor | null
   onColorChange: (color: ColoringSettingsColor) => void
   onColorAdded: (color: IColor) => void
}

const ColorerColorsPicker = ({
   color,
   onColorChange,
   onColorAdded,
}: ColorerColorsPickerProps) => {
   const rgbColor = {
      r: Math.floor(color?.color.r ?? 0),
      g: Math.floor(color?.color.g ?? 0),
      b: Math.floor(color?.color.b ?? 0),
   }

   const [selectedColor, setColor] = useColor(
      RGBToHex(rgbColor.r, rgbColor.g, rgbColor.b)
   )

   const handleColorChange = (newColor: IColor) => {
      setColor(newColor)
      onColorChange({
         id: color?.id ?? "",
         minimumAreaThreshold: color?.minimumAreaThreshold ?? 0,
         color: {
            r: newColor.rgb.r,
            g: newColor.rgb.g,
            b: newColor.rgb.b,
            a: 255,
         },
      })
   }

   return (
      <>
         <ColorPicker
            hideInput={["hsv"]}
            color={selectedColor}
            onChange={handleColorChange}
         />
         <Button
            className="w-full"
            onClick={(e) => {
               e.preventDefault()
               onColorAdded(selectedColor)
            }}
         >
            Add color
         </Button>
      </>
   )
}

export { ColorerColorsPicker }
