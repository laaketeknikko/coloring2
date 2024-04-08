import { useState } from "react"

import { CustomInputNumber } from "./CustomInputNumber"
import { InputText } from "primereact/inputtext"
import { HexToRGB, RGBToHex } from "../../utils/imageUtils"
import { useAtom, useSetAtom } from "jotai"
import {
   globalBorderColorAtom,
   globalBorderColorToleranceAtom,
} from "../../atoms/atoms"

const BorderColorPicker = () => {
   const [borderColor, setBorderColor] = useState<{
      r: number
      g: number
      b: number
   }>({ r: 0, g: 0, b: 0 })

   const [borderHexColor, setBorderHexColor] = useState("#000000")

   const setGlobalBorderColor = useSetAtom(globalBorderColorAtom)
   const [globalBorderColorTolerance, setGlobalBorderColorTolerance] = useAtom(
      globalBorderColorToleranceAtom
   )

   const handleBorderRGBColorChange = (color: {
      r: number
      g: number
      b: number
   }) => {
      setBorderColor({ r: color.r, g: color.g, b: color.b })
      setGlobalBorderColor(color)
      setBorderHexColor(RGBToHex(color.r, color.g, color.b))
   }

   const handleBorderHexColorChange = (color: string) => {
      setBorderHexColor(color)
      const { r, g, b } = HexToRGB(color)
      setBorderColor({ r, g, b })
      setGlobalBorderColor({ r, g, b })
   }

   const handleBorderColorToleranceChange = (color: {
      r: number
      g: number
      b: number
   }) => {
      setGlobalBorderColorTolerance(color)
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

         {/* Color input*/}
         <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
               <label htmlFor="border-color-r">RGB</label>
            </span>
            <CustomInputNumber
               value={borderColor.r}
               inputId="border-color-r"
               onChange={(value) => {
                  handleBorderRGBColorChange({
                     r: value,
                     g: borderColor.g,
                     b: borderColor.b,
                  })
               }}
            />

            <CustomInputNumber
               value={borderColor.g}
               inputId="border-color-g"
               onChange={(value) =>
                  handleBorderRGBColorChange({
                     r: borderColor.r,
                     g: value,
                     b: borderColor.b,
                  })
               }
            />

            <CustomInputNumber
               value={borderColor.b}
               inputId="border-color-b"
               onChange={(value) =>
                  handleBorderRGBColorChange({
                     r: borderColor.r,
                     g: borderColor.g,
                     b: value,
                  })
               }
            />
         </div>

         {/* Tolerance input */}
         <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
               <label htmlFor="border-color-tolerance-r">Tolerance</label>
            </span>
            <CustomInputNumber
               value={0}
               inputId="border-color-tolerance-r"
               onChange={(value) => {
                  handleBorderColorToleranceChange({
                     r: value,
                     g: globalBorderColorTolerance.g,
                     b: globalBorderColorTolerance.b,
                  })
               }}
            />

            <CustomInputNumber
               value={0}
               inputId="border-color-tolerance-g"
               onChange={(value) =>
                  handleBorderColorToleranceChange({
                     r: globalBorderColorTolerance.r,
                     g: value,
                     b: globalBorderColorTolerance.b,
                  })
               }
            />

            <CustomInputNumber
               value={0}
               inputId="border-color-tolerance-b"
               onChange={(value) =>
                  handleBorderColorToleranceChange({
                     r: globalBorderColorTolerance.r,
                     g: globalBorderColorTolerance.g,
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
               onChange={(e) => handleBorderHexColorChange(e.target.value)}
            />
         </div>
      </>
   )
}

export { BorderColorPicker }
