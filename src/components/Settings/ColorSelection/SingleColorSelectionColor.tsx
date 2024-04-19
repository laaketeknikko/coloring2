import { InputNumber } from "primereact/inputnumber"
import { ColoringSettingsColor } from "../../../utils/ColoringSettings"
import { RemoveButton } from "../../utils/RemoveButton"

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

   const handleThresholdChange = (threshold: number | null) => {
      // Change threshold from 0-100 to 0-1
      onThresholdChange({
         ...color,
         minimumAreaThreshold: (threshold ?? 0) / 100,
      })
   }

   return (
      <div
         className="border-round-lg border-2 border-solid border-900"
         style={{
            aspectRatio: "1/1",
            backgroundColor: `rgb(${String(color.color.r)}, ${String(
               color.color.g
            )}, ${String(color.color.b)})`,
         }}
      >
         <div
            className="flex flex-row gap-1 justify-content-between"
            style={{ maxWidth: "100%" }}
         >
            <div style={{}} className="">
               <RemoveButton onRemove={handleColorRemove} id={color.id} />
            </div>
            <div className="">
               <InputNumber
                  id={color.id}
                  tooltip="Threshold from 0 to 100 %."
                  format={false}
                  min={0}
                  max={100}
                  value={threshold * 100}
                  maxFractionDigits={10}
                  suffix=" %"
                  placeholder="Threshold %"
                  className="p-inputtext-sm w-full"
                  inputClassName="w-full"
                  onChange={(e) => {
                     handleThresholdChange(e.value)
                  }}
               />
            </div>
         </div>
      </div>
   )
}

export { SingleColorSelectionColor }
