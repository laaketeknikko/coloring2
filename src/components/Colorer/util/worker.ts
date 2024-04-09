import ColoringWorker from "./work?worker"

const coloringWorker = new ColoringWorker()

import { getDefaultStore } from "jotai"
import { newestProcessedImageAtom } from "../../../atoms/atoms"
import Image from "image-js"
import {
   DataUrlWithSettings,
   ImageWithSettings,
   isDataUrlWithSettings,
} from "../../../types/types"

coloringWorker.onmessage = (event: MessageEvent<DataUrlWithSettings>) => {
   if (!isDataUrlWithSettings(event.data)) {
      console.log("got invalid data: ", event.data)
      return
   }

   Image.load(event.data.dataUrl).then((image) => {
      const jotaiStore = getDefaultStore()

      jotaiStore.set(newestProcessedImageAtom, {
         imageData: {
            image: image,
            dataUrl: image.toDataURL(),
         },
         settings: event.data.settings,
         id: event.data.id,
      })
   })
}

const runColoring = (imageWithSettings: ImageWithSettings) => {
   const dataUrlWithSettings: DataUrlWithSettings = {
      dataUrl: imageWithSettings.imageData.dataUrl,
      settings: imageWithSettings.settings,
      id: imageWithSettings.id,
   }
   coloringWorker.postMessage(dataUrlWithSettings)
}

export { runColoring }
