import { InputNumber } from "primereact/inputnumber"
import { ColoringSettingsColor } from "../../../utils/ColoringSettings"
import { RemoveButton } from "../../utils/RemoveButton"
import { PrimeIcons } from "primereact/api"

export interface SingleColorSelectionColorProps {
   color: ColoringSettingsColor
   onRemove: (color: ColoringSettingsColor) => void
   threshold: number
   onThresholdChange: (color: ColoringSettingsColor) => void
}

const SingleColorSelectionColor = ({
   color,
   onRemove,
   threshold,
   onThresholdChange,
}: SingleColorSelectionColorProps) => {
   const handleColorRemove = () => {
      onRemove(color)
   }

   const handleThresholdChange = (threshold: number) => {
      // Change threshold from 0-100 to 0-1
      onThresholdChange({ ...color, minimumAreaThreshold: threshold / 100 })
   }

   return (
      <div
         className="border-round-lg border-2 border-solid border-900"
         style={{
            aspectRatio: "1/1",
            backgroundColor: `rgb(${color.color.r}, ${color.color.g}, ${color.color.b})`,
         }}
      >
         <div
            className="flex flex-row gap-1 justify-content-start"
            style={{ maxWidth: "100%" }}
         >
            <div style={{}} className="">
               <RemoveButton onRemove={handleColorRemove} id={color.id} />
            </div>
            <div className="">
               <div className="p-inputgroup">
                  <InputNumber
                     format={false}
                     min={0}
                     max={100}
                     value={(threshold || 0) * 100}
                     maxFractionDigits={10}
                     suffix=" %"
                     placeholder="Threshold %"
                     className="p-inputtext-sm w-full"
                     inputClassName="w-full"
                     onChange={(e) => handleThresholdChange(e.value || 0)}
                  />
                  <div className="p-inputgroup-addon bg-primary-500">
                     <i className={`${PrimeIcons.INFO_CIRCLE}`} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export { SingleColorSelectionColor }
