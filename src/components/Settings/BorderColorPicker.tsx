import { useState } from "react"

import { CustomInputNumber } from "./CustomInputNumber"
import { useAtom, useSetAtom } from "jotai"
import {
   globalBorderColorAtom,
   globalBorderColorToleranceAtom,
} from "../../atoms/atoms"
import { CustomColorInput, CustomColorInputColor } from "./CustomColorInput"

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

   const handleBorderColorChange = (color: CustomColorInputColor) => {
      setGlobalBorderColor(color.rgb)
      setBorderHexColor(color.hex)
      setBorderColor(color.rgb)
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
         <CustomColorInput
            color={{ rgb: borderColor, hex: borderHexColor }}
            onChange={handleBorderColorChange}
         />

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
      </>
   )
}

export { BorderColorPicker }
