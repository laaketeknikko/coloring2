import { Image } from "image-js"
import { ColoringSettings } from "../ColoringSettings"

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
   image: Image,
   borderColor: Array<number>,
   radius: number
) => {
   if (radius <= 0) {
      return false
   }

   const imageWidth = image.width
   const imageHeight = image.height

   const minX = Math.max(x - radius, 0)
   const maxX = Math.min(x + radius, imageWidth - 1)
   const minY = Math.max(y - radius, 0)
   const maxY = Math.min(y + radius, imageHeight - 1)

   for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
         if (i === x && j === y) {
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

const mapAreaFrom = (
   image: Image,
   startX: number,
   startY: number,
   mappedPoints: Array<Array<boolean>>,
   borderColor: Array<number>,
   borderTolerance: Array<number> = [0, 0, 0],
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

      if (x < 0 || y < 0 || x >= image.width || y >= image.height) {
         continue
      }

      const pixel = image.getPixelXY(x, y)
      const isMapped = mappedPoints[x]?.[y]

      if (
         !isMapped &&
         !colorIsWithinTolerance(pixel, borderColor, borderTolerance) &&
         !isBorderWithinRadius(x, y, image, borderColor, borderPatching)
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

const paintPixels = (
   image: Image,
   area: Array<Array<number>>,
   color: Array<number>
) => {
   for (const point of area) {
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

const colorImage = (image: Image, settings: ColoringSettings) => {
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
      allMappedPoints.push(Array<boolean>(height).fill(false))
   }

   for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
         const pixel = image.getPixelXY(x, y)

         const isMapped = allMappedPoints[x]?.[y]

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

   for (const area of areasAndColors) {
      paintPixels(image, area.area, area.color)
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
