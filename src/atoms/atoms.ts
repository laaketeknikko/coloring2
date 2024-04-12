import { atom } from "jotai"
import { ImageWithSettings } from "../types/types"
import {
   ColoringSettings,
   ColoringSettingsColor,
} from "../utils/ColoringSettings"

const selectedFilesAtom = atom<Array<File>>([])
const uploadedFilesAtom = atom<Array<ImageWithSettings>>([])

const processingQueueAtom = atom<Array<ImageWithSettings>>([])
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
const globalColoringColorsAtom = atom<Array<ColoringSettingsColor>>([])
const globalBorderPatchingAtom = atom(0)
const globalColorByAreaSize = atom(false)
const globalColorByAreaNumber = atom(false)

const globalColoringSettingsAtom = atom<ColoringSettings>((get) => {
   const borderColor = get(globalBorderColorAtom)
   const borderColorTolerance = get(globalBorderColorToleranceAtom)
   const globalColoringColors = get(globalColoringColorsAtom)
   const globalPatching = get(globalBorderPatchingAtom)
   const colorByAreaSize = get(globalColorByAreaSize)
   const colorByAreaNumber = get(globalColorByAreaNumber)

   return {
      borderColor,
      borderColorTolerance,
      colorsToUse: globalColoringColors,
      borderPatching: globalPatching,
      colorByAreaNumber: colorByAreaNumber,
      colorByAreaSize: colorByAreaSize,
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
   globalBorderPatchingAtom,
   processingQueueAtom,
   globalColorByAreaSize,
   globalColorByAreaNumber,
}
