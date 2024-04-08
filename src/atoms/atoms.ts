import { atom } from "jotai"
import { Color, ImageWithSettings } from "../types/types"
import { ColoringSettings } from "../utils/ColoringSettings"

const selectedFilesAtom = atom<Array<File>>([])
const uploadedFilesAtom = atom<Array<ImageWithSettings>>([])
const processedImagesAtom = atom<Array<ImageWithSettings>>([])

const newestProcessedImageAtom = atom<ImageWithSettings | null>(null)

const globalBorderColorAtom = atom({
   r: 0,
   g: 0,
   b: 0,
})
const globalBorderColorToleranceAtom = atom({
   r: 0,
   g: 0,
   b: 0,
})
const globalColoringColorsAtom = atom<Array<Color>>([])

const globalColoringSettingsAtom = atom((get) => {
   const borderColor = get(globalBorderColorAtom)
   const borderColorTolerance = get(globalBorderColorToleranceAtom)
   const globalColoringColors = get(globalColoringColorsAtom)

   return {
      ...new ColoringSettings(),
      borderColor,
      borderColorTolerance,
      colorsToUse: globalColoringColors,
   }
})

export {
   uploadedFilesAtom,
   processedImagesAtom,
   newestProcessedImageAtom,
   selectedFilesAtom,
   globalColoringSettingsAtom,
   globalBorderColorAtom,
   globalBorderColorToleranceAtom,
   globalColoringColorsAtom,
}
