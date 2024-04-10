import * as fflate from "fflate"
import { ImageWithSettings } from "../types/types"

const getFileName = (
   keys: Array<{ filename: string; sequence: number }>,
   image: ImageWithSettings
) => {
   let fileIndex = keys.findIndex(
      (key) => key.filename === image.imageData.meta.name
   )

   if (fileIndex === -1) {
      keys.push({ filename: image.imageData.meta.name, sequence: 1 })
      fileIndex = keys.length - 1
   } else {
      keys[fileIndex].sequence += 1
   }

   const split = keys[fileIndex].filename.split(".")
   const ext = "." + split.pop()

   const fileName = `${split.join(".")}_${keys[fileIndex].sequence}${ext}`

   return fileName
}

const zipImages = (
   images: Array<ImageWithSettings>,
   callback: fflate.FlateCallback
) => {
   const keys: Array<{
      filename: string
      sequence: number
   }> = []

   const files: Record<string, [Uint8Array, { level: 0 }]> = {}

   for (const image of images) {
      const fileName = getFileName(keys, image)

      files[fileName] = [image.imageData.image.toBuffer(), { level: 0 }]
   }

   fflate.zip(files, callback)
}

export { zipImages }
