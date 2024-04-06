import Image from "image-js"
import { atom } from "jotai"

const uploadedFilesAtom = atom<Array<File>>([])

const processedImagesAtom = atom<Array<Image>>([])

const newestProcessedImageAtom = atom<Image | null>(null)

export { uploadedFilesAtom, processedImagesAtom, newestProcessedImageAtom }
