import { useAtom } from "jotai"
import { Checkbox } from "primereact/checkbox"
import {
   globalAlgorithmDirectionAtom,
   globalColorByAreaNumberAtom,
   globalColorByAreaSizeAtom,
} from "../../../atoms/atoms"
import { HelpButton } from "../../../utils/HelpButton"
import { Divider } from "primereact/divider"

const AlgorithmOptions = () => {
   const [colorByNumber, setColorByNumber] = useAtom(
      globalColorByAreaNumberAtom
   )
   const [colorBySize, setColorBySize] = useAtom(globalColorByAreaSizeAtom)
   const [algorithmDirection, setAlgorithmDirection] = useAtom(
      globalAlgorithmDirectionAtom
   )

   return (
      <div>
         <div className="">
            <p>
               Size-based coloring{" "}
               <HelpButton size={"small"}>
                  <div className="">
                     <p>
                        Allows you to control how the algorithm treats the
                        custom color thresholds.
                     </p>
                     <p>
                        <strong>Randomly</strong>: The algorithm will randomly
                        use the custom colors without taking into consideration
                        the threshold values.
                     </p>
                     <p>
                        <strong>By size</strong>: The algorithm will use the
                        custom colors only if the the relative size of the area
                        compared to the total area size is larger than the
                        threshold. The highest threshold value applicable is
                        used.
                     </p>
                     <p>
                        <strong>By number</strong>: The algorithm will use the
                        custom colors only if the size of the area is larger
                        than the percentage of other areas defined by the
                        threshold value.
                     </p>
                  </div>
               </HelpButton>
            </p>
            <span>Compare by: </span>
            <div className="flex flex-column align-items-end">
               <label className="flex-1">
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
               <br />
               <label className="flex-1">
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
               <br />
               <label className="flex-1">
                  Randomly
                  <Checkbox
                     className="mx-1"
                     checked={!colorByNumber && !colorBySize}
                     onChange={() => {
                        setColorByNumber(false)
                        setColorBySize(false)
                     }}
                  />
               </label>
            </div>
         </div>
         <Divider className="m-1" />
         <div>
            <p>
               Area mapping
               <HelpButton size={"small"}>
                  <div className="">
                     <p>Choose how areas are mapped</p>
                     <p>
                        <strong>8-way</strong>: The algorithm will map to all
                        adjacent pixels when finding an uncolored pixel. Will
                        result in properly filled areas. The coloring might
                        bleed through outlines if the outlines are pixelated.
                     </p>
                     <p>
                        <strong>4-way</strong>: The algorithm will map
                        orthogonally to adjacent pixels. Lone pixels in some
                        areas might not be colored. Better tolerance for broken
                        outlines.
                     </p>
                     <p>
                        <strong>4-way diagonal</strong>: The algorithm will map
                        to diagonally adjacent pixels. This is more about
                        aesthetics than mapping. This results in every other
                        pixel being different colors, which might create a more
                        washed-out and not as strong impression.
                     </p>
                  </div>
               </HelpButton>
            </p>
            <div className="flex flex-column align-items-end">
               <label className="flex-1">
                  8-way
                  <Checkbox
                     id="algorithm-8-way"
                     name="algorithm-direction"
                     checked={algorithmDirection === "8"}
                     onChange={() => {
                        setAlgorithmDirection("8")
                     }}
                  ></Checkbox>
               </label>
               <label className="flex-1">
                  4-way orthogonal
                  <Checkbox
                     id="algorithm-4-way"
                     name="algorithm-direction"
                     checked={algorithmDirection === "4"}
                     onChange={() => {
                        setAlgorithmDirection("4")
                     }}
                  ></Checkbox>
               </label>
               <label className="flex-1">
                  4-way diagonal
                  <Checkbox
                     id="algorithm-4-way-diagonal"
                     name="algorithm-direction"
                     checked={algorithmDirection === "4-diagonal"}
                     onChange={() => {
                        setAlgorithmDirection("4-diagonal")
                     }}
                  ></Checkbox>
               </label>
            </div>
         </div>
      </div>
   )
}

export { AlgorithmOptions }
