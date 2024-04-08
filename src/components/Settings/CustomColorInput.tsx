import { Dropdown } from "primereact/dropdown"
import { useState } from "react"
import { Color } from "../../types/types"
import { InputText } from "primereact/inputtext"
import { HexToRGB, RGBToHex } from "../../utils/imageUtils"
import { CustomInputNumber } from "./CustomInputNumber"

export interface ColorInputColor {
   rgb: Color
   hex: string
}

const defaultColor: ColorInputColor = {
   rgb: { r: 0, g: 0, b: 0 },
   hex: "#000000",
}

const CustomColorInput = () => {
   const [selectedColorMode, setSelectedColorMode] = useState<"HEX" | "RGB">(
      "RGB"
   )
   const [selectedColor, setSelectedColor] =
      useState<ColorInputColor>(defaultColor)

   const handleHexColorChange = (hex: string) => {
      const rgbColor = HexToRGB(hex)
      setSelectedColor({ rgb: rgbColor, hex: hex })
   }

   const handleRGBColorChange = (rgb: Color) => {
      setSelectedColor({ rgb: rgb, hex: RGBToHex(rgb.r, rgb.g, rgb.b) })
   }

   return (
      <div className="p-inputgroup">
         <span className="p-inputgroup-addon">
            <Dropdown
               placeholder="RGB"
               value={selectedColorMode}
               options={["RGB", "HEX"]}
               onChange={(e) => setSelectedColorMode(e.value)}
            />
         </span>
         {selectedColorMode === "HEX" && (
            <InputText
               value={selectedColor.hex}
               onChange={(event) => handleHexColorChange(event.target.value)}
            />
         )}
         {selectedColorMode === "RGB" && (
            <>
               <CustomInputNumber
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

export { CustomColorInput }
