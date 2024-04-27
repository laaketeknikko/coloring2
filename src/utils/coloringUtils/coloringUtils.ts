import { Image } from "image-js"
import { ColoringSettings } from "../ColoringSettings"
//import Color from "colorjs.io"
import { ColorSpace, PlainColorObject, sRGB, set, to, HSV } from "colorjs.io/fn"

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
      Math.max(color2[0] - color2Tolerance[0], 0),
      Math.max(color2[1] - color2Tolerance[1], 0),
      Math.max(color2[2] - color2Tolerance[2], 0),
   ]
   const maxBound = [
      Math.min(255, color2[0] + color2Tolerance[0]),
      Math.min(255, color2[1] + color2Tolerance[1]),
      Math.min(255, color2[2] + color2Tolerance[2]),
   ]

   return (
      colorIsLargerOrEqual(color1, minBound) &&
      colorIsSmallerOrEqual(color1, maxBound)
   )
}

const selectRandomPaintColor = () => {
   return [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
   ]
}

const isBorderWithinRadius = (
   x: number,
   y: number,
   imageBorders: Array<Array<boolean>>,
   radius: number
) => {
   if (radius <= 0) {
      return false
   }

   const imageWidth = imageBorders.length
   const imageHeight = imageBorders[0].length

   const minX = Math.max(x - radius, 0)
   const maxX = Math.min(x + radius, imageWidth - 1)
   const minY = Math.max(y - radius, 0)
   const maxY = Math.min(y + radius, imageHeight - 1)

   for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
         if (i === x && j === y) {
            continue
         }

         if (imageBorders[i][j]) {
            return true
         }
      }
   }

   return false
}

const mapAreaFrom = (
   imageWidth: number,
   imageHeight: number,
   startX: number,
   startY: number,
   mappedPoints: Array<Array<boolean>>,
   imageBorders: Array<Array<boolean>>,
   borderPatching: number,
   algorithmDirection: "4" | "8" | "4-diagonal"
) => {
   const queue: Array<[number, number]> = [[startX, startY]]
   const area: Array<[number, number]> = []

   while (queue.length > 0) {
      const coord = queue.shift()
      let x = 0
      let y = 0
      if (coord) {
         x = coord[0]
         y = coord[1]
      } else {
         return { area, mappedPoints }
      }

      if (x < 0 || y < 0 || x >= imageWidth || y >= imageHeight) {
         continue
      }

      const isMapped = mappedPoints[x]?.[y]

      if (
         !isMapped &&
         !imageBorders[x][y] &&
         !isBorderWithinRadius(x, y, imageBorders, borderPatching)
      ) {
         mappedPoints[x][y] = true
         area.push([x, y])

         switch (algorithmDirection) {
            case "8":
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
               break
            case "4":
               queue.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1])
               break
            case "4-diagonal":
               queue.push(
                  [x - 1, y - 1],
                  [x + 1, y - 1],
                  [x - 1, y + 1],
                  [x + 1, y + 1]
               )
               break
         }
      }
   }

   return { area, mappedPoints }
}

const sortAreasBySize = (areas: Array<Array<[number, number]>>) => {
   return areas.slice(0).sort((a, b) => b.length - a.length)
}

const paintPixelsBlackAndWhite = (
   image: Image,
   area: Array<Array<number>>,
   color: Array<number>
) => {
   for (const point of area) {
      image.setPixelXY(point[0], point[1], color)
   }
}

/*
Using the object-oriented API.
The procedural API is more efficient.

const paintPixelsGrayscale = (
   image: Image,
   area: Array<Array<number>>,
   color: Array<number>,
   settings: ColoringSettings
) => {
   const hsvPaintColor = new Color("sRGB", [
      color[0] / 255,
      color[1] / 255,
      color[2] / 255,
   ])

   for (const point of area) {
      const pixel = image.getPixelXY(point[0], point[1])

      const hsvPixelColor = new Color("sRGB", [
         pixel[0] / 255,
         pixel[1] / 255,
         pixel[2] / 255,
      ])

      hsvPaintColor.hsv.v = hsvPixelColor.hsv.v
      image.setPixelXY(point[0], point[1], [
         Math.floor(hsvPaintColor.srgb.r * 255),
         Math.floor(hsvPaintColor.srgb.g * 255),
         Math.floor(hsvPaintColor.srgb.b * 255),
      ])
   }
}
*/

const paintPixelsGrayscaleProcedurcalApi = (
   image: Image,
   area: Array<Array<number>>,
   color: Array<number>
) => {
   ColorSpace.register(sRGB)
   ColorSpace.register(HSV)

   let hsvPaintColorProc: PlainColorObject = {
      space: sRGB,
      coords: [color[0] / 255, color[1] / 255, color[2] / 255],
      alpha: 1,
   }

   for (const point of area) {
      const pixel = image.getPixelXY(point[0], point[1])

      const rgbPixelColorProc: PlainColorObject = {
         space: sRGB,
         coords: [pixel[0] / 255, pixel[1] / 255, pixel[2] / 255],
         alpha: 1,
      }

      const hsvPixelColorProc = to(rgbPixelColorProc, "hsv")

      hsvPaintColorProc = to(hsvPaintColorProc, "hsv")
      set(hsvPaintColorProc, "v", hsvPixelColorProc.coords[2])
      const rgbPaintColorProc = to(hsvPaintColorProc, "srgb")

      image.setPixelXY(point[0], point[1], [
         Math.floor(rgbPaintColorProc.coords[0] * 255),
         Math.floor(rgbPaintColorProc.coords[1] * 255),
         Math.floor(rgbPaintColorProc.coords[2] * 255),
      ])
   }
}

const getPaintColorsByAreaSize = (
   areas: Array<Array<[number, number]>>,
   colors: ColoringSettings
): Array<{
   area: Array<Array<number>>
   color: Array<number>
}> => {
   const sortedSettings = colors.colorsToUse.sort(
      (a, b) => (a.minimumAreaThreshold ?? 0) - (b.minimumAreaThreshold ?? 0)
   )

   const result: Array<{
      area: Array<Array<number>>
      color: Array<number>
   }> = []

   const totalArea = areas.reduce((acc, area) => acc + area.length, 0)

   for (const setting of sortedSettings) {
      const color = setting.color
      for (const area of areas) {
         const areaProportion = area.length / totalArea
         if (areaProportion >= (setting.minimumAreaThreshold ?? 0)) {
            result.push({
               area: area,
               color: [color.r, color.g, color.b],
            })
         }
      }
   }

   return result
}

const getPaintColorsByAreaNumber = (
   areas: Array<Array<[number, number]>>,
   colors: ColoringSettings
): Array<{
   area: Array<Array<number>>
   color: Array<number>
}> => {
   const sortedColors = colors.colorsToUse
      .slice()
      .sort(
         (a, b) => (b.minimumAreaThreshold ?? 0) - (a.minimumAreaThreshold ?? 0)
      )

   const sortedAreas = areas.slice().sort((a, b) => a.length - b.length)

   const result: Array<{
      area: Array<Array<number>>
      color: Array<number>
   }> = []

   for (const area of sortedAreas) {
      const areaProportion =
         (sortedAreas.findLastIndex((a) => {
            return a.length < area.length
         }) || 0) / sortedAreas.length

      for (const color of sortedColors) {
         if (areaProportion >= (color.minimumAreaThreshold ?? 0)) {
            result.push({
               area: area,
               color: [color.color.r, color.color.g, color.color.b],
            })
            break
         }
      }
   }

   return result
}

const getRandomPaintColors = (areas: Array<Array<[number, number]>>) => {
   const result: Array<{
      area: Array<Array<number>>
      color: Array<number>
   }> = []

   for (const area of areas) {
      result.push({
         area: area,
         color: selectRandomPaintColor(),
      })
   }

   return result
}

const getBorders = (image: Image, settings: ColoringSettings) => {
   const imageWidth = image.width
   const imageHeight = image.height

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

   const borders: Array<Array<boolean>> = []
   for (let i = 0; i < imageWidth; i++) {
      borders.push(Array<boolean>(imageHeight).fill(false))
   }

   for (let x = 0; x < imageWidth; x++) {
      for (let y = 0; y < imageHeight; y++) {
         const pixel = image.getPixelXY(x, y)

         if (colorIsWithinTolerance(pixel, borderColor, borderTolerance)) {
            borders[x][y] = true
         }
      }
   }

   return borders
}

const colorImage = (image: Image, settings: ColoringSettings) => {
   const width = image.width
   const height = image.height
   const areas: Array<Array<[number, number]>> = []

   const imageBorders = getBorders(image, settings)

   let allMappedPoints: Array<Array<boolean>> = []
   for (let i = 0; i < width; i++) {
      allMappedPoints.push(Array<boolean>(height).fill(false))
   }

   for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
         const isMapped = allMappedPoints[x]?.[y]

         if (
            !isMapped &&
            !imageBorders[x][y] &&
            !isBorderWithinRadius(x, y, imageBorders, settings.borderPatching)
         ) {
            const { area, mappedPoints } = mapAreaFrom(
               image.width,
               image.height,
               x,
               y,
               allMappedPoints,
               imageBorders,
               settings.borderPatching,
               settings.algorithmDirection
            )

            allMappedPoints = mappedPoints

            if (area.length > 0) {
               areas.push(area)
            }
         }
      }
   }

   let areasAndColors: ReturnType<
      typeof getPaintColorsByAreaNumber | typeof getPaintColorsByAreaSize
   > = []

   if (settings.colorByAreaNumber || settings.colorByAreaSize) {
      const sortedAreas = sortAreasBySize(areas)

      if (settings.colorByAreaNumber) {
         areasAndColors = getPaintColorsByAreaNumber(sortedAreas, settings)
      } else if (settings.colorByAreaSize) {
         areasAndColors = getPaintColorsByAreaSize(sortedAreas, settings)
      }
   } else {
      areasAndColors = getRandomPaintColors(areas)
   }

   if (settings.coloringMode === "grayscale") {
      for (const area of areasAndColors) {
         paintPixelsGrayscaleProcedurcalApi(image, area.area, area.color)
      }
   } else {
      for (const area of areasAndColors) {
         paintPixelsBlackAndWhite(image, area.area, area.color)
      }
   }
}

const processImage = (image: Image, settings: ColoringSettings) => {
   colorImage(image, settings)

   return new Promise<Image>((resolve, reject) => {
      resolve(image)
      reject(Error("Error processing image"))
   })
}

export { processImage }
