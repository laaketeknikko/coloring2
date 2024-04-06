import ColoringWorker from "./work?worker"

const coloringWorker = new ColoringWorker()

import { getDefaultStore } from "jotai"
import { newestProcessedImageAtom } from "../../../atoms/atoms"
import Image from "image-js"

coloringWorker.onmessage = (event) => {
   if (!event.data || !(typeof event.data === "string")) {
      console.log("got invalid data: ", event.data)
      return
   }

   Image.load(event.data).then((image) => {
      const jotaiStore = getDefaultStore()

      jotaiStore.set(newestProcessedImageAtom, image)
   })
}

const runColoring = (file: File) => {
   console.log("in runcoloring with files: ", file)
   coloringWorker.postMessage(file)
}

export { runColoring }
