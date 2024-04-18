import { Dropdown } from "primereact/dropdown"
import { useState } from "react"
import { Color } from "../../types/types"
import { InputText } from "primereact/inputtext"
import { HexToRGB, RGBToHex } from "../../utils/imageUtils"
import { CustomInputNumber } from "./CustomInputNumber"

export interface CustomColorInputProps {
   color: CustomColorInputColor
   onChange: (color: CustomColorInputColor) => void
}

export interface CustomColorInputColor {
   rgb: Color
   hex: string
}

const defaultColor: CustomColorInputColor = {
   rgb: { r: 0, g: 0, b: 0 },
   hex: "#000000",
}

const BorderColorInput = ({
   color = defaultColor,
   onChange,
}: CustomColorInputProps) => {
   const [selectedColorMode, setSelectedColorMode] = useState<"HEX" | "RGB">(
      "RGB"
   )
   const [selectedColor, setSelectedColor] =
      useState<CustomColorInputColor>(color)

   const handleHexColorChange = (hex: string) => {
      const rgbColor = HexToRGB(hex)
      setSelectedColor({ rgb: rgbColor, hex: hex })
      onChange({ rgb: rgbColor, hex: hex })
   }

   const handleRGBColorChange = (rgb: Color) => {
      const hex = RGBToHex(rgb.r, rgb.g, rgb.b)
      setSelectedColor({ rgb: rgb, hex: hex })
      onChange({ rgb: rgb, hex: hex })
   }

   return (
      <div className="p-inputgroup">
         <span className="p-inputgroup-addon ">Color</span>
         <span className="p-inputgroup-addon p-0">
            <Dropdown
               className="w-auto"
               tooltip="Area outline color in the image."
               panelClassName="p-0 w-auto"
               pt={{
                  trigger: {
                     className: "w-auto p-1",
                  },
               }}
               placeholder="RGB"
               value={selectedColorMode}
               options={["RGB", "HEX"]}
               onChange={(e) => setSelectedColorMode(e.value)}
            />
         </span>
         {selectedColorMode === "HEX" && (
            <InputText
               tooltip="Hex value of the area outline color."
               tooltipOptions={{ position: "right" }}
               value={selectedColor.hex}
               onChange={(event) => handleHexColorChange(event.target.value)}
            />
         )}
         {selectedColorMode === "RGB" && (
            <>
               <CustomInputNumber
                  tooltip="Red value of the area outline color."
                  tooltipOptions={{ position: "right" }}
                  inputId="r"
                  value={selectedColor.rgb.r}
                  onChange={(value) =>
                     handleRGBColorChange({
                        r: value,
                        g: selectedColor.rgb.g,
                        b: selectedColor.rgb.b,
                     })
                  }
               />

               <CustomInputNumber
                  tooltip="Green value of the area outline color."
                  tooltipOptions={{ position: "right" }}
                  inputId="g"
                  value={selectedColor.rgb.g}
                  onChange={(value) =>
                     handleRGBColorChange({
                        r: selectedColor.rgb.r,
                        g: value,
                        b: selectedColor.rgb.b,
                     })
                  }
               />

               <CustomInputNumber
                  tooltip="Blue value of the area outline color."
                  tooltipOptions={{ position: "right" }}
                  inputId="b"
                  value={selectedColor.rgb.b}
                  onChange={(value) =>
                     handleRGBColorChange({
                        r: selectedColor.rgb.r,
                        g: selectedColor.rgb.g,
                        b: value,
                     })
                  }
               />
            </>
         )}
      </div>
   )
}

export { BorderColorInput }
