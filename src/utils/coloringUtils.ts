import { Image } from "image-js"
import { ColoringSettings, ColoringSettingsColor } from "./ColoringSettings"

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

const selectPaintColor = (list: Array<ColoringSettingsColor>) => {
   if (list.length === 0) {
      return null
   }
   const color = list[Math.floor(Math.random() * list.length)]

   return [color.color.r, color.color.g, color.color.b]
}

const isBorderWithinRadius = (
   x: number,
   y: number,
   image: Image,
   borderColor: Array<number>,
   radius: number
) => {
   if (radius <= 0) {
      return false
   }

   const minX = x - radius
   const maxX = x + radius
   const minY = y - radius
   const maxY = y + radius

   for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
         if (i === x && j === y) {
            continue
         }
         if (i < 0 || j < 0 || i >= image.width || j >= image.height) {
            continue
         }
         const pixel = image.getPixelXY(i, j)
         if (colorsAreEqual(pixel, borderColor)) {
            return true
         }
      }
   }

   return false
}

const colorAreaFrom = (
   image: Image,
   x: number,
   y: number,
   paintColor: Array<number>,
   borderColor: Array<number>,
   borderTolerance: Array<number> = [0, 0, 0],
   borderPatching: number
) => {
   const queue: Array<[number, number]> = [[x, y]]
   const points: Array<Array<number>> = []

   while (queue.length > 0) {
      const [x, y] = queue.shift()!

      if (x < 0 || y < 0 || x >= image.width || y >= image.height) {
         continue
      }

      const pixel = image.getPixelXY(x, y)

      if (
         !colorsAreEqual(pixel, paintColor) &&
         !colorIsWithinTolerance(pixel, borderColor, borderTolerance) &&
         !isBorderWithinRadius(x, y, image, borderColor, borderPatching)
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

const colorImageWithoutAreas = async (
   image: Image,
   settings: ColoringSettings
) => {
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
            !colorIsWithinTolerance(pixel, borderColor, borderTolerance) &&
            !isBorderWithinRadius(
               x,
               y,
               image,
               borderColor,
               settings.borderPatching
            )
         ) {
            usedColors.push(paintColor)
            const area = colorAreaFrom(
               image,
               x,
               y,
               paintColor,
               borderColor,
               borderTolerance,
               settings.borderPatching
            )

            if (area.length > 0) {
               //                  areas.push(area)
            }
            //borderPoints.push([x, y])
         }
      }
   }
}

/**
 *
 *
 * Mapping algorithm
 */

const isPixelInArea = (area: Array<Array<number>>, x: number, y: number) => {
   const found = area.find((point) => point[0] === x && point[1] === y)
   if (found) {
      return true
   } else {
      return false
   }
}

const isPixelInAreas = (
   areas: Array<Array<Array<number>>>,
   x: number,
   y: number
) => {
   const found = areas.find((area) => isPixelInArea(area, x, y))
   if (found) {
      return true
   } else {
      return false
   }
}

const mapAreaFrom = (
   image: Image,
   startX: number,
   startY: number,
   mappedPoints: Array<Array<boolean>>,
   borderColor: Array<number>,
   borderTolerance: Array<number> = [0, 0, 0],
   borderPatching: number
) => {
   const queue: Array<[number, number]> = [[startX, startY]]
   const area: Array<[number, number]> = []

   while (queue.length > 0) {
      const [x, y] = queue.shift()!

      if (x < 0 || y < 0 || x >= image.width || y >= image.height) {
         continue
      }

      const pixel = image.getPixelXY(x, y)
      const isMapped = mappedPoints[x] && mappedPoints[x][y]

      if (
         !isMapped &&
         !colorIsWithinTolerance(pixel, borderColor, borderTolerance) &&
         !isBorderWithinRadius(x, y, image, borderColor, borderPatching)
      ) {
         mappedPoints[x][y] = true
         area.push([x, y])
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

   return { area, mappedPoints }
}

const sortAreasBySize = (areas: Array<Array<[number, number]>>) => {
   return areas.slice(0).sort((a, b) => b.length - a.length)
}

const paintPixels = (
   image: Image,
   area: Array<Array<number>>,
   color: Array<number>
) => {
   for (let i = 0; i < area.length; i++) {
      const point = area[i]
      image.setPixelXY(point[0], point[1], color)
   }
}

const getPaintColorsByAreaSize = (
   areas: Array<Array<[number, number]>>,
   colors: ColoringSettings
): Array<{
   area: Array<Array<number>>
   color: Array<number>
}> => {
   const sortedColors = colors.colorsToUse.sort(
      (a, b) => (a.minimumAreaThreshold || 0) - (b.minimumAreaThreshold || 0)
   )

   const result: Array<{
      area: Array<Array<number>>
      color: Array<number>
   }> = []

   const totalArea = areas.reduce((acc, area) => acc + area.length, 0)

   for (const color of sortedColors) {
      for (const area of areas) {
         const areaProportion = area.length / totalArea
         if (areaProportion >= (color.minimumAreaThreshold || 0)) {
            result.push({
               area: area,
               color: [color.color.r, color.color.g, color.color.b],
            })
         }
      }
   }

   return result
}

const colorImageWithAreas = async (
   image: Image,
   settings: ColoringSettings
) => {
   const width = image.width
   const height = image.height
   const areas: Array<Array<[number, number]>> = []

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

   let allMappedPoints: Array<Array<boolean>> = []
   for (let i = 0; i < width; i++) {
      allMappedPoints.push(Array(height).fill(false))
   }

   for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
         const pixel = image.getPixelXY(x, y)

         const isMapped = allMappedPoints[x] && allMappedPoints[x][y]

         if (
            !isMapped &&
            !colorIsWithinTolerance(pixel, borderColor, borderTolerance) &&
            !isBorderWithinRadius(
               x,
               y,
               image,
               borderColor,
               settings.borderPatching
            )
         ) {
            const { area, mappedPoints } = mapAreaFrom(
               image,
               x,
               y,
               allMappedPoints,
               borderColor,
               borderTolerance,
               settings.borderPatching
            )

            allMappedPoints = mappedPoints

            console.log("got area: ", area)

            if (area.length > 0) {
               areas.push(area)
            }
         }
      }
   }

   const sortedAreas = sortAreasBySize(areas)

   const paintColors = getPaintColorsByAreaSize(sortedAreas, settings)

   for (const area of paintColors) {
      paintPixels(image, area.area, area.color)
   }
}

const processImage = async (image: Image, settings: ColoringSettings) => {
   if (settings.colorByAreaNumber || settings.colorByAreaSize) {
      await colorImageWithAreas(image, settings)
   } else {
      await colorImageWithoutAreas(image, settings)
   }

   return image
}

export { processImage }
