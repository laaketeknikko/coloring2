import Image from "image-js"

const isImage = (object: unknown): object is Image => {
   if (object && typeof object === "object" && Image.isImage(object)) {
      return true
   } else {
      return false
   }
}

export { isImage }
