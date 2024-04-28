import { useState } from "react"

import { CustomInputNumber } from "../CustomInputNumber"
import { useAtom } from "jotai"
import {
   globalBorderColorAtom,
   globalBorderColorToleranceAtom,
} from "../../../atoms/atoms"
import { BorderColorInput, CustomColorInputColor } from "../CustomColorInput"
import { RGBToHex } from "../../../utils/imageUtils"

const OutlineColorPicker = () => {
   const [globalBorderColor, setGlobalBorderColor] = useAtom(
      globalBorderColorAtom
   )

   const [borderColor, setBorderColor] = useState<{
      r: number
      g: number
      b: number
   }>(globalBorderColor)

   const [borderHexColor, setBorderHexColor] = useState(
      RGBToHex(globalBorderColor.r, globalBorderColor.g, globalBorderColor.b)
   )

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
         {/* Color input*/}
         <BorderColorInput
            color={{ rgb: borderColor, hex: borderHexColor }}
            onChange={handleBorderColorChange}
         />

         {/* Tolerance input */}
         <div className="p-inputgroup">
            <span className="p-inputgroup-addon p-1 bg-teal-50">
               <label htmlFor="border-color-tolerance-r">Tolerance</label>
            </span>
            <CustomInputNumber
               value={globalBorderColorTolerance.r}
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
               value={globalBorderColorTolerance.g}
               inputId="border-color-tolerance-g"
               onChange={(value) => {
                  handleBorderColorToleranceChange({
                     r: globalBorderColorTolerance.r,
                     g: value,
                     b: globalBorderColorTolerance.b,
                  })
               }}
            />

            <CustomInputNumber
               value={globalBorderColorTolerance.b}
               inputId="border-color-tolerance-b"
               onChange={(value) => {
                  handleBorderColorToleranceChange({
                     r: globalBorderColorTolerance.r,
                     g: globalBorderColorTolerance.g,
                     b: value,
                  })
               }}
            />
         </div>
      </>
   )
}

export { OutlineColorPicker }
