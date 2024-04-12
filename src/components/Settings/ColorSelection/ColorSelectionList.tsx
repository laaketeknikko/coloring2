import { useAtom } from "jotai"
import { globalColoringColorsAtom } from "../../../atoms/atoms"
import { useCallback, useMemo } from "react"
import { SingleColorSelectionColor } from "./SingleColorSelectionColor"
import { ColoringSettingsColor } from "../../../utils/ColoringSettings"

const ColorSelectionList = () => {
   const [globalColors, setGlobalColors] = useAtom(globalColoringColorsAtom)

   const handleColorRemove = useCallback(
      (color: ColoringSettingsColor) => {
         setGlobalColors(globalColors.filter((c) => c.id !== color.id))
      },
      [globalColors, setGlobalColors]
   )

   const handleColorThresholdChange = useCallback(
      (changedColor: ColoringSettingsColor) => {
         const color = globalColors.find(
            (color) => color.id === changedColor.id
         )

         if (!color) {
            return
         }

         setGlobalColors(
            globalColors.map((color) =>
               color.id === changedColor.id ? changedColor : color
            )
         )
      },
      [globalColors, setGlobalColors]
   )

   const colorElements = useMemo(() => {
      return globalColors.map((color) => {
         return (
            <div
               key={`${color.id}`}
               className="col-4 sm:col-12 md:col-4 lg:col-3 xl:col-2"
            >
               <SingleColorSelectionColor
                  color={color}
                  onRemove={handleColorRemove}
                  onThresholdChange={handleColorThresholdChange}
               />
            </div>
         )
      })
   }, [globalColors, handleColorRemove, handleColorThresholdChange])

   return <div className="grid h-screen">{colorElements}</div>
}

export { ColorSelectionList }
