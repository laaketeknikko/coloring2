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
         <p>Algorithm settings</p>
         <div>
            <span>Compare by: </span>
            <label>
               Number of areas
               <Checkbox
                  className="mx-1"
                  checked={colorByNumber}
                  onChange={() => {
                     setColorByNumber(!colorByNumber)
                     setColorBySize(false)
                  }}
               />
            </label>
            <label>
               Size of area
               <Checkbox
                  className="mx-1"
                  checked={colorBySize}
                  onChange={() => {
                     setColorBySize(!colorBySize)
                     setColorByNumber(false)
                  }}
               />
            </label>
         </div>
      </div>
   )
}

export { AlgorithmSelection }
