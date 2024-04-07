import Image from "image-js"

const isImage = (object: unknown): object is Image => {
   if (object && typeof object === "object" && Image.isImage(object)) {
      return true
   } else {
      return false
   }
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

export { isImage, RGBToHex, HexToRGB }
