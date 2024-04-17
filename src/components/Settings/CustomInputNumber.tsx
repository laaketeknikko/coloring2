import { InputNumber } from "primereact/inputnumber"
import { TooltipOptions } from "primereact/tooltip/tooltipoptions"

export interface CustomInputNumberProps {
   inputId: string
   value: number
   onChange: (value: number) => void
   tooltip?: string
   tooltipOptions?: TooltipOptions
}

const CustomInputNumber = (props: CustomInputNumberProps) => {
   return (
      <InputNumber
         className=""
         tooltip={props.tooltip}
         tooltipOptions={props.tooltipOptions}
         inputClassName="p-1"
         min={0}
         max={255}
         inputId={props.inputId}
         value={props.value}
         onValueChange={(event) => {
            const value =
               event.value === null || event.value === undefined
                  ? 0
                  : event.value
            props.onChange(value)
         }}
      />
   )
}

export { CustomInputNumber }
