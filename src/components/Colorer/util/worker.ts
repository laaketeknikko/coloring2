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

   Image.load(event.data.data.dataUrl)
      .then((image) => {
         const jotaiStore = getDefaultStore()

         jotaiStore.set(newestProcessedImageAtom, {
            imageData: {
               meta: {
                  name: event.data.data.meta.name,
               },
               image: image,
               dataUrl: image.toDataURL(),
            },
            settings: event.data.settings,
            id: event.data.id,
         })
      })
      .catch((error: unknown) => {
         console.log(error)
      })
}

const runColoring = (imageWithSettings: ImageWithSettings) => {
   console.log("Running coloring with: ", imageWithSettings)

   const dataUrlWithSettings: DataUrlWithSettings = {
      data: {
         dataUrl: imageWithSettings.imageData.dataUrl,
         meta: { name: imageWithSettings.imageData.meta.name },
      },
      settings: imageWithSettings.settings,
      id: imageWithSettings.id,
   }
   coloringWorker.postMessage(dataUrlWithSettings)
}

export { runColoring }
