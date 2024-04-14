import { useAtom } from "jotai"
import { Checkbox } from "primereact/checkbox"
import {
   globalColorByAreaNumber,
   globalColorByAreaSize,
} from "../../../atoms/atoms"
import { HelpButton } from "../../../utils/HelpButton"

const AlgorithmSelection = () => {
   const [colorByNumber, setColorByNumber] = useAtom(globalColorByAreaNumber)
   const [colorBySize, setColorBySize] = useAtom(globalColorByAreaSize)

   return (
      <div>
         <p>
            Algorithm settings{" "}
            <HelpButton size={"small"}>
               <p>
                  Choose if the algorithm should color areas by their area size
                  or their number.
               </p>
            </HelpButton>
         </p>
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
