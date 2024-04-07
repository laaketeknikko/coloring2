import { atom } from "jotai"
import { ImageWithSettings } from "../types/types"
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

const globalColoringSettingsAtom = atom((get) => {
   const borderColor = get(globalBorderColorAtom)
   const borderColorTolerance = get(globalBorderColorToleranceAtom)

   return { ...new ColoringSettings(), borderColor, borderColorTolerance }
})

export {
   uploadedFilesAtom,
   processedImagesAtom,
   newestProcessedImageAtom,
   selectedFilesAtom,
   globalColoringSettingsAtom,
   globalBorderColorAtom,
   globalBorderColorToleranceAtom,
}
