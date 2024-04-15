import { useState } from "react"
import { BorderColorInput, CustomColorInputColor } from "./CustomColorInput"
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker"
import { RGBToHex } from "../../utils/imageUtils"

const CustomColorPicker = () => {
   const [color, setColor] = useState<CustomColorInputColor>({
      rgb: { r: 0, g: 0, b: 0 },
      hex: "#000000",
   })

   const handleCustomColorInputChange = (color: CustomColorInputColor) => {
      setColor(color)
   }

   const handleColorPickerChange = (event: ColorPickerChangeEvent) => {
      const color = event.value

      if (
         !color ||
         !(typeof color === "object") ||
         !("r" in color && "g" in color && "b" in color)
      ) {
         return
      }

      setColor({ rgb: color, hex: RGBToHex(color.r, color.g, color.b) })
   }

   return (
      <>
         <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
               <ColorPicker
                  format="rgb"
                  value={color.rgb}
                  onChange={handleColorPickerChange}
               />
            </span>
            <BorderColorInput
               color={color}
               onChange={handleCustomColorInputChange}
            />
         </div>
      </>
   )
}

export { CustomColorPicker }
