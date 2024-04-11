import { atom } from "jotai"
import { ImageWithSettings } from "../types/types"
import { ColoringSettingsColor } from "../utils/ColoringSettings"

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

const globalColoringSettingsAtom = atom((get) => {
   const borderColor = get(globalBorderColorAtom)
   const borderColorTolerance = get(globalBorderColorToleranceAtom)
   const globalColoringColors = get(globalColoringColorsAtom)
   const globalPatching = get(globalBorderPatchingAtom)

   return {
      borderColor,
      borderColorTolerance,
      colorsToUse: globalColoringColors,
      borderPatching: globalPatching,
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
}
