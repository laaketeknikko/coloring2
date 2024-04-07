import { InputNumber } from "primereact/inputnumber"

export interface CustomInputNumberProps {
   inputId: string
   value: number
   onChange: (value: number) => void
}

const CustomInputNumber = (props: CustomInputNumberProps) => {
   return (
      <InputNumber
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
