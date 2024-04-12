import { Color } from "../types/types"

export interface ColoringSettingsColor {
   color: Color
   id: string
   minimumAreaThreshold?: number
}

class ColoringSettings {
   borderColor: Color
   borderColorTolerance: Color
   borderPatching: number
   colorsToUse: Array<ColoringSettingsColor>
   colorByAreaNumber: boolean
   colorByAreaSize: boolean

   constructor() {
      this.borderColor = { r: 0, g: 0, b: 0 }
      this.borderColorTolerance = { r: 0, g: 0, b: 0 }
      this.borderPatching = 0
      this.colorsToUse = []
      this.colorByAreaNumber = false
      this.colorByAreaSize = false
   }

   static isColoringSettings(settings: unknown): settings is ColoringSettings {
      if (
         settings &&
         typeof settings === "object" &&
         "borderColor" in settings &&
         "borderColorTolerance" in settings &&
         "borderPatching" in settings &&
         "colorsToUse" in settings
      ) {
         return true
      } else {
         return false
      }
   }
}

export { ColoringSettings }
