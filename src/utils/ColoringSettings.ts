import { Color } from "../types/types"

export interface ColoringSettingsColor {
   color: Color
   id: string
   minimumAreaThreshold?: number
}

export type ShadingMode = "lightness" | "bw" | "transparency"

export type ColoringSettingsAlgorithmDirection = "4" | "8" | "4-diagonal"

class ColoringSettings {
   borderColor: Color
   borderColorTolerance: Color
   borderPatching: number
   colorsToUse: Array<ColoringSettingsColor>
   colorByAreaNumber: boolean
   colorByAreaSize: boolean
   algorithmDirection: ColoringSettingsAlgorithmDirection
   coloringMode: ShadingMode

   constructor() {
      this.borderColor = { r: 0, g: 0, b: 0 }
      this.borderColorTolerance = { r: 0, g: 0, b: 0 }
      this.borderPatching = 0
      this.colorsToUse = []
      this.colorByAreaNumber = false
      this.colorByAreaSize = false
      this.algorithmDirection = "8"
      this.coloringMode = "bw"
   }

   static isColoringSettings(settings: unknown): settings is ColoringSettings {
      if (
         settings &&
         typeof settings === "object" &&
         "borderColor" in settings &&
         "borderColorTolerance" in settings &&
         "borderPatching" in settings &&
         "colorsToUse" in settings &&
         "colorByAreaNumber" in settings &&
         "colorByAreaSize" in settings &&
         "algorithmDirection" in settings &&
         "coloringMode" in settings
      ) {
         return true
      } else {
         return false
      }
   }
}

export { ColoringSettings }
