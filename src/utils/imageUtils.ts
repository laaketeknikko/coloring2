import Image from "image-js"

const isImage = (object: unknown): object is Image => {
   if (object && typeof object === "object" && Image.isImage(object)) {
      return true
   } else {
      return false
   }
}

const imageFromFile = async (file: File): Promise<Image | null> => {
   return new Promise((resolve, reject) => {
      const dataUrlReader = new FileReader()

      dataUrlReader.onload = async () => {
         if (dataUrlReader.result) {
            const image = await Image.load(dataUrlReader.result)
            resolve(image)
         } else {
            reject(null)
         }
      }

      dataUrlReader.readAsDataURL(file)
   })
}

const imagesFromFiles = async (files: Array<File>): Promise<Array<Image>> => {
   const images: Array<Image> = []

   for (const file of files) {
      try {
         const image = await imageFromFile(file)
         if (image) {
            images.push(image)
         }
      } catch (error) {
         console.log(error)
      }
   }

   console.log("returning images from files: ", images)
   console.log("original files were: ", files)

   return images
}

const RGBToHex = (
   r: number | string,
   g: number | string,
   b: number | string
) => {
   r = r.toString(16)
   g = g.toString(16)
   b = b.toString(16)

   if (r.length == 1) r = "0" + r
   if (g.length == 1) g = "0" + g
   if (b.length == 1) b = "0" + b

   return "#" + r + g + b
}

const HexToRGB = (hex: string) => {
   let r: number | string = 0
   let g: number | string = 0
   let b: number | string = 0

   // 3 digits
   if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1]
      g = "0x" + hex[2] + hex[2]
      b = "0x" + hex[3] + hex[3]

      // 6 digits
   } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2]
      g = "0x" + hex[3] + hex[4]
      b = "0x" + hex[5] + hex[6]
   }

   return { r: Number(r), g: Number(g), b: Number(b) }
}

export { isImage, RGBToHex, HexToRGB, imageFromFile, imagesFromFiles }
