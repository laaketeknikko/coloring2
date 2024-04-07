import {
   DataUrlWithSettings,
   isDataUrlWithSettings,
} from "../../../types/types"
import { processImage } from "../../../utils/coloringUtils"
import Image from "image-js"

onmessage = function (event: MessageEvent<DataUrlWithSettings>) {
   if (!isDataUrlWithSettings(event.data)) {
      return null
   }

   // TODO: use settings in processing

   Image.load(event.data.dataUrl).then((image) => {
      processImage(image).then((processedImage) => {
         const dataUrl = processedImage.toDataURL()

         this.postMessage({ dataUrl: dataUrl, settings: event.data.settings })
      })
   })
}
