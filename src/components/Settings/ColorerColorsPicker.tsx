import { Button } from "primereact/button"
import { ColorPicker, IColor, useColor } from "react-color-palette"

export interface ColorerColorsPickerProps {
   onSelectColor: (color: IColor) => void
}

const ColorerColorsPicker = ({ onSelectColor }: ColorerColorsPickerProps) => {
   const [color, setColor] = useColor("#000000")

   return (
      <>
         <ColorPicker hideInput={["hsv"]} color={color} onChange={setColor} />
         <Button
            className="w-full"
            onClick={(e) => {
               e.preventDefault()
               onSelectColor(color)
            }}
         >
            Add color
         </Button>
      </>
   )
}

export { ColorerColorsPicker }
