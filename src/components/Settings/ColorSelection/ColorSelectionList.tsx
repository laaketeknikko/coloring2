import { useAtom } from "jotai"
import { globalColoringColorsAtom } from "../../../atoms/atoms"
import { useCallback, useMemo } from "react"
import { SingleColorSelectionColor } from "./SingleColorSelectionColor"
import { ColoringSettingsColor } from "../../../utils/ColoringSettings"
import { colorSelectionSelectedColorAtom } from "./atoms"

const ColorSelectionList = () => {
   const [globalColors, setGlobalColors] = useAtom(globalColoringColorsAtom)

   const [selectedColor, setSelectedColor] = useAtom(
      colorSelectionSelectedColorAtom
   )

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
      return globalColors
         .slice()
         .sort(
            (a, b) =>
               (b.minimumAreaThreshold ?? 0) - (a.minimumAreaThreshold ?? 0)
         )
         .map((color) => {
            return (
               <div
                  key={color.id}
                  className={`col-12 sm:col-6 md:col-12 lg:col-6 xl:col-6
                  ${
                     color.id === selectedColor?.id
                        ? "bg-yellow-100 shadow"
                        : ""
                  }`}
               >
                  <SingleColorSelectionColor
                     threshold={color.minimumAreaThreshold ?? 0}
                     color={color}
                     onRemove={handleColorRemove}
                     onThresholdChange={handleColorThresholdChange}
                     onSelected={setSelectedColor}
                  />
               </div>
            )
         })
   }, [
      globalColors,
      handleColorRemove,
      handleColorThresholdChange,
      selectedColor?.id,
      setSelectedColor,
   ])

   return <div className="grid max-h-30rem">{colorElements}</div>
}

export { ColorSelectionList }
