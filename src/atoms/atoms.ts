import { atom } from "jotai"
import { ImageWithSettings } from "../types/types"
import {
   ColoringSettings,
   ColoringSettingsAlgorithmDirection,
   ColoringSettingsColor,
} from "../utils/ColoringSettings"

const selectedFilesAtom = atom<Array<File>>([])
const uploadedImagesAtom = atom<Array<ImageWithSettings>>([])

const processingQueueAtom = atom<Array<ImageWithSettings>>([])
const coloredImagesAtom = atom<Array<ImageWithSettings>>([])

const newestProcessedImageAtom = atom<ImageWithSettings | null>(null)
const isProcessingPausedAtom = atom(true)

const globalBorderColorAtom = atom({
   r: 0,
   g: 0,
   b: 0,
})
const globalBorderColorToleranceAtom = atom({
   r: 100,
   g: 100,
   b: 100,
})
const globalColoringColorsAtom = atom<Array<ColoringSettingsColor>>([])
const globalBorderPatchingAtom = atom(1)
const globalColorByAreaSizeAtom = atom(false)
const globalColorByAreaNumberAtom = atom(false)
const globalAlgorithmDirectionAtom =
   atom<ColoringSettingsAlgorithmDirection>("8")

const globalColoringSettingsAtom = atom<ColoringSettings>((get) => {
   const borderColor = get(globalBorderColorAtom)
   const borderColorTolerance = get(globalBorderColorToleranceAtom)
   const globalColoringColors = get(globalColoringColorsAtom)
   const globalPatching = get(globalBorderPatchingAtom)
   const colorByAreaSize = get(globalColorByAreaSizeAtom)
   const colorByAreaNumber = get(globalColorByAreaNumberAtom)
   const algorithmDirection = get(globalAlgorithmDirectionAtom)

   return {
      borderColor,
      borderColorTolerance,
      colorsToUse: globalColoringColors,
      borderPatching: globalPatching,
      colorByAreaNumber: colorByAreaNumber,
      colorByAreaSize: colorByAreaSize,
      algorithmDirection: algorithmDirection,
   }
})

export {
   uploadedImagesAtom,
   coloredImagesAtom,
   newestProcessedImageAtom,
   selectedFilesAtom,
   globalColoringSettingsAtom,
   globalBorderColorAtom,
   globalBorderColorToleranceAtom,
   globalColoringColorsAtom,
   globalBorderPatchingAtom,
   processingQueueAtom,
   globalColorByAreaSizeAtom,
   globalColorByAreaNumberAtom,
   isProcessingPausedAtom,
   globalAlgorithmDirectionAtom,
}
