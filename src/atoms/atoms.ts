import Image from "image-js"
import { atom } from "jotai"

const uploadedFilesAtom = atom<Array<File>>([])

const processedImagesAtom = atom<Array<Image>>([])

export { uploadedFilesAtom, processedImagesAtom }
