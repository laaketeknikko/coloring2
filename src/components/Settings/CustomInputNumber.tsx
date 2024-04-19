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
         tooltip={props.tooltip}
         tooltipOptions={props.tooltipOptions}
         inputClassName="p-1 text-sm m-0"
         min={0}
         max={255}
         inputId={props.inputId}
         value={props.value}
         onValueChange={(event) => {
            const value = event.value ?? 0
            props.onChange(value)
         }}
      />
   )
}

export { CustomInputNumber }
