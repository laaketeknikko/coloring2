import { Color } from "../types/types"

class ColoringSettings {
   borderColor: Color
   borderColorTolerance: Color
   borderPatching: number
   colorsToUse: Array<Color>

   constructor() {
      this.borderColor = { r: 0, g: 0, b: 0 }
      this.borderColorTolerance = { r: 0, g: 0, b: 0 }
      this.borderPatching = 0
      this.colorsToUse = []
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
