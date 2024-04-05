import { Image } from "image-js"

const paintAreaFrom = (
   image: Image,
   x: number,
   y: number,
   paintColor: Array<number>,
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
         pixel[0] !== paintColor[0] &&
         pixel[1] !== paintColor[1] &&
         pixel[2] !== paintColor[2] &&
         pixel[0] >= 100 &&
         pixel[1] >= 100 &&
         pixel[2] >= 100
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

const colorImage = async (image: Image) => {
   const width = image.width
   const height = image.height

   const borderPoints: Array<Array<number>> = []
   //const areas: Array<Array<Array<number>>> = []
   let numberOfAreas = 0
   const usedColors: Array<Array<number>> = []

   for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
         const pixel = image.getPixelXY(x, y)
         const paintColor = [
            Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
            Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
            Math.floor(Math.random() * 0.6 * 255 + 0.4 * 255),
         ]

         const painted = usedColors.find((color) => {
            return (
               color[0] === pixel[0] &&
               color[1] === pixel[1] &&
               color[2] === pixel[2]
            )
         })
         if (
            !painted &&
            !(pixel[0] < 100 && pixel[1] < 100 && pixel[2] < 100)
         ) {
            usedColors.push(paintColor)
            const area = paintAreaFrom(image, x, y, paintColor)
            numberOfAreas++
            console.log("area: ", numberOfAreas)
            console.log("x and y: ", x, y)

            if (area.length > 0) {
               console.log("x, y: ", x, y)
               console.log("painting area: ", numberOfAreas)

               //                  areas.push(area)
            }
            //borderPoints.push([x, y])
         }
      }
   }
   console.log("borderpoints: ", borderPoints)
   //image.paintPolygons(areas, { randomColors: true })
}

const processImage = async (image: Image) => {
   await colorImage(image)
   const url = image.toDataURL("image/png")

   return url
}

export { processImage }
