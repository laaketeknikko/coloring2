import Image from "image-js"
import { ColoringSettings } from "../utils/ColoringSettings"

export interface Color {
   r: number
   g: number
   b: number
   a?: number
}

export interface ImageData {
   meta: {
      name: string
   }
   image: Image
   dataUrl: string
}

export interface DataURLData {
   dataUrl: string
   meta: {
      name: string
   }
}

export interface ImageWithSettings {
   imageData: ImageData
   id: string
   settings: ColoringSettings
}

export interface DataUrlWithSettings {
   data: DataURLData
   id: string
   settings: ColoringSettings
}

const isImageData = (data: unknown): data is ImageData => {
   if (
      data &&
      typeof data === "object" &&
      "meta" in data &&
      "image" in data &&
      "dataUrl" in data
   ) {
      return true
   } else {
      return false
   }
}

const isDataUrlData = (data: unknown): data is DataURLData => {
   if (
      data &&
      typeof data === "object" &&
      "dataUrl" in data &&
      "meta" in data
   ) {
      return true
   } else {
      return false
   }
}

const isDataUrlWithSettings = (data: unknown): data is DataUrlWithSettings => {
   if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      isDataUrlData(data.data) &&
      "id" in data &&
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
      "imageData" in data &&
      isImageData(data.imageData) &&
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
