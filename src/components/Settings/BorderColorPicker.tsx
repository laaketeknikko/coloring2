import { useState } from "react"

import { CustomInputNumber } from "./CustomInputNumber"
import { InputText } from "primereact/inputtext"
import { HexToRGB, RGBToHex } from "../../utils/imageUtils"

const BorderColorPicker = () => {
   const [borderColor, setBorderColor] = useState<{
      r: number
      g: number
      b: number
   }>({ r: 0, g: 0, b: 0 })

   const [borderHexColor, setBorderHexColor] = useState("#000000")

   const handleRGBColorChange = (color: {
      r: number
      g: number
      b: number
   }) => {
      setBorderColor({ r: color.r, g: color.g, b: color.b })
      setBorderHexColor(RGBToHex(color.r, color.g, color.b))
   }

   const handleHexColorChange = (color: string) => {
      setBorderHexColor(color)
      const { r, g, b } = HexToRGB(color)
      setBorderColor({ r, g, b })
   }

   return (
      <>
         <span className="block text-center">Border color in image</span>
         <span
            className="block"
            style={{
               height: "1rem",
               backgroundColor: `rgb(${borderColor.r},${borderColor.g},${borderColor.b})`,
            }}
         ></span>
         <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
               <label htmlFor="border-color-r">RGB</label>
            </span>
            <CustomInputNumber
               inputId="border-color-r"
               onChange={(value) => {
                  handleRGBColorChange({
                     r: value,
                     g: borderColor.g,
                     b: borderColor.b,
                  })
               }}
            />

            <CustomInputNumber
               inputId="border-color-g"
               onChange={(value) =>
                  handleRGBColorChange({
                     r: borderColor.r,
                     g: value,
                     b: borderColor.b,
                  })
               }
            />

            <CustomInputNumber
               inputId="border-color-b"
               onChange={(value) =>
                  handleRGBColorChange({
                     r: borderColor.r,
                     g: borderColor.g,
                     b: value,
                  })
               }
            />
         </div>

         <div className="p-inputgroup">
            <div className="p-inputgroup-addon">
               <label htmlFor="border-color-hex">HEX</label>
            </div>
            <InputText
               id="border-color-hex"
               value={borderHexColor}
               onChange={(e) => handleHexColorChange(e.target.value)}
            />
         </div>
      </>
   )
}

export { BorderColorPicker }
