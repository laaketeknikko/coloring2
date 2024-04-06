import { processImage } from "../../../utils/coloringUtils"
import Image from "image-js"

onmessage = function (event) {
   console.log("got data from main: ", event.data)

   if (
      !event.data ||
      !("size" in event.data && "type" in event.data && "name" in event.data)
   ) {
      return null
   }

   const file = event.data

   const dataUrlReader = new FileReader()
   dataUrlReader.onload = (event) => {
      if (event.target?.result) {
         Image.load(event.target.result).then((image) => {
            console.log("got loaded image: ", image)
            processImage(image).then((processedImage) => {
               console.log("processed image in worker: ", processedImage)
               this.postMessage(processedImage.toDataURL())
            })
         })
      }
   }

   dataUrlReader.readAsDataURL(file)
}
