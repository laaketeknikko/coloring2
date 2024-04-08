import { Image } from "image-js"
import { ColoringSettings } from "./ColoringSettings"
import { Color } from "../types/types"

const colorsAreEqual = (color1: Array<number>, color2: Array<number>) => {
   return (
      color1[0] === color2[0] &&
      color1[1] === color2[1] &&
      color1[2] === color2[2]
   )
}

const colorIsSmallerOrEqual = (
   color1: Array<number>,
   color2: Array<number>
) => {
   return (
      color1[0] <= color2[0] && color1[1] <= color2[1] && color1[2] <= color2[2]
   )
}

const colorIsLargerOrEqual = (color1: Array<number>, color2: Array<number>) => {
   return (
      color1[0] >= color2[0] && color1[1] >= color2[1] && color1[2] >= color2[2]
   )
}

const colorIsWithinTolerance = (
   color1: Array<number>,
   color2: Array<number>,
   color2Tolerance: Array<number>
) => {
   const minBound = [
      color2[0] - color2Tolerance[0],
      color2[1] - color2Tolerance[1],
      color2[2] - color2Tolerance[2],
   ].map((value) => (value < 0 ? 0 : value))
   const maxBound = [
      color2[0] + color2Tolerance[0],
      color2[1] + color2Tolerance[1],
      color2[2] + color2Tolerance[2],
   ].map((value) => (value > 255 ? 255 : value))

   return (
      colorIsLargerOrEqual(color1, minBound) &&
      colorIsSmallerOrEqual(color1, maxBound)
   )
}

const selectRandomPaintColor = () => {
   return [
      Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
      Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
      Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
   ]
}

const selectPaintColor = (list: Array<Color>) => {
   if (list.length === 0) {
      return null
   }
   const color = list[Math.floor(Math.random() * list.length)]

   return [color.r, color.g, color.b]
}

const paintAreaFrom = (
   image: Image,
   x: number,
   y: number,
   paintColor: Array<number>,
   borderColor: Array<number>,
   borderTolerance: Array<number> = [0, 0, 0]
) => {
   const queue: Array<[number, number]> = [[x, y]]
   const points: Array<Array<number>> = []

   console.log("Painting area with: ", paintColor)

   while (queue.length > 0) {
      const [x, y] = queue.shift()!

      if (x < 0 || y < 0 || x >= image.width || y >= image.height) {
         continue
      }

      const pixel = image.getPixelXY(x, y)

      if (
         !colorsAreEqual(pixel, paintColor) &&
         !colorIsWithinTolerance(pixel, borderColor, borderTolerance)
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
   const borderTolerance = [
      settings.borderColorTolerance.r,
      settings.borderColorTolerance.g,
      settings.borderColorTolerance.b,
   ]

   console.log("border color: ", borderColor)
   console.log("Tolerance: ", borderTolerance)

   for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
         const pixel = image.getPixelXY(x, y)

         const paintColor =
            settings.colorsToUse.length > 0
               ? selectPaintColor(settings.colorsToUse)!
               : selectRandomPaintColor()

         const painted = usedColors.find((color) => {
            return colorsAreEqual(pixel, color)
         })
         if (
            !painted &&
            !colorIsWithinTolerance(pixel, borderColor, borderTolerance)
         ) {
            usedColors.push(paintColor)
            const area = paintAreaFrom(
               image,
               x,
               y,
               paintColor,
               borderColor,
               borderTolerance
            )

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
