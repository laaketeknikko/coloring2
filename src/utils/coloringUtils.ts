import { Image } from "image-js"
import { ColoringSettings } from "./ColoringSettings"

const colorsAreEqual = (color1: Array<number>, color2: Array<number>) => {
   return (
      color1[0] === color2[0] &&
      color1[1] === color2[1] &&
      color1[2] === color2[2]
   )
}

const paintAreaFrom = (
   image: Image,
   x: number,
   y: number,
   paintColor: Array<number>,
   borderColor: Array<number>,
   points: Array<Array<number>> = []
) => {
   const queue: Array<[number, number]> = [[x, y]]

   while (queue.length > 0) {
      const [x, y] = queue.shift()!

      if (x < 0 || y < 0 || x >= image.width || y >= image.height) {
         continue
      }

      const pixel = image.getPixelXY(x, y)

      if (
         !colorsAreEqual(pixel, paintColor) &&
         !colorsAreEqual(pixel, borderColor)
      ) {
         image.setPixelXY(x, y, paintColor)

         points.push(pixel)
         queue.push(
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
         )
      }
   }

   return points
}

const colorImage = async (image: Image, settings: ColoringSettings) => {
   const width = image.width
   const height = image.height

   const usedColors: Array<Array<number>> = []
   const borderColor = [
      settings.borderColor.r,
      settings.borderColor.g,
      settings.borderColor.b,
   ]

   console.log("bordercolor is: ", borderColor)

   for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
         const pixel = image.getPixelXY(x, y)
         const paintColor = [
            Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
            Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
            Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
         ]

         const painted = usedColors.find((color) => {
            return colorsAreEqual(pixel, color)
         })
         if (!painted && !colorsAreEqual(pixel, borderColor)) {
            usedColors.push(paintColor)
            const area = paintAreaFrom(image, x, y, paintColor, borderColor)

            if (area.length > 0) {
               //                  areas.push(area)
            }
            //borderPoints.push([x, y])
         }
      }
   }
}

const processImage = async (image: Image, settings: ColoringSettings) => {
   await colorImage(image, settings)

   return image
}

export { processImage }
