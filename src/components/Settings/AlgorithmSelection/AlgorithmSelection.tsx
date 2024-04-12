import { useAtom } from "jotai"
import { Checkbox } from "primereact/checkbox"
import {
   globalColorByAreaNumber,
   globalColorByAreaSize,
} from "../../../atoms/atoms"

const AlgorithmSelection = () => {
   const [colorByNumber, setColorByNumber] = useAtom(globalColorByAreaNumber)
   const [colorBySize, setColorBySize] = useAtom(globalColorByAreaSize)

   return (
      <div>
         <p>Coloring by area</p>
         <label>
            Number
            <Checkbox
               checked={colorByNumber}
               onChange={() => {
                  setColorByNumber(!colorByNumber)
                  setColorBySize(false)
               }}
            />
         </label>
         <label>
            Size
            <Checkbox
               checked={colorBySize}
               onChange={() => {
                  setColorBySize(!colorBySize)
                  setColorByNumber(false)
               }}
            />
         </label>
      </div>
   )
}

export { AlgorithmSelection }
