import {
   DataUrlWithSettings,
   isDataUrlWithSettings,
} from "../../../types/types"
import { processImage } from "../../../utils/coloringUtils/coloringUtils"
import Image from "image-js"

onmessage = function (event: MessageEvent<DataUrlWithSettings>) {
   if (!isDataUrlWithSettings(event.data)) {
      return null
   }

   Image.load(event.data.data.dataUrl)
      .then((image) => {
         processImage(image, event.data.settings)
            .then((processedImage) => {
               const dataUrl = processedImage.toDataURL()

               const message: DataUrlWithSettings = {
                  data: {
                     dataUrl: dataUrl,
                     meta: { name: event.data.data.meta.name },
                  },
                  settings: event.data.settings,
                  id: event.data.id,
               }

               this.postMessage(message)
            })
            .catch((error: unknown) => {
               console.log(error)
            })
      })
      .catch((error: unknown) => {
         console.log(error)
      })
}
