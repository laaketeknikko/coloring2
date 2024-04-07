import { atom } from "jotai"
import { ImageWithSettings } from "../types/types"

const selectedFilesAtom = atom<Array<File>>([])
const uploadedFilesAtom = atom<Array<ImageWithSettings>>([])
const processedImagesAtom = atom<Array<ImageWithSettings>>([])

const newestProcessedImageAtom = atom<ImageWithSettings | null>(null)

export {
   uploadedFilesAtom,
   processedImagesAtom,
   newestProcessedImageAtom,
   selectedFilesAtom,
}
