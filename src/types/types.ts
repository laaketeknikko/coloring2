import Image from "image-js"
import { ColoringSettings } from "../utils/ColoringSettings"

export interface Color {
   r: number
   g: number
   b: number
   a?: number
}

export interface ImageWithSettings {
   image: Image
   id: string
   settings: ColoringSettings
}

export interface DataUrlWithSettings {
   dataUrl: string
   id: string
   settings: ColoringSettings
}

const isDataUrlWithSettings = (data: unknown): data is DataUrlWithSettings => {
   if (
      data &&
      typeof data === "object" &&
      "dataUrl" in data &&
      "settings" in data
   ) {
      if (ColoringSettings.isColoringSettings(data.settings)) {
         return true
      } else {
         return false
      }
   } else {
      return false
   }
}

const isImageWithSettings = (data: unknown): data is ImageWithSettings => {
   if (
      data &&
      typeof data === "object" &&
      "image" in data &&
      "settings" in data
   ) {
      if (ColoringSettings.isColoringSettings(data.settings)) {
         return true
      } else {
         return false
      }
   } else {
      return false
   }
}

export { isImageWithSettings, isDataUrlWithSettings }
