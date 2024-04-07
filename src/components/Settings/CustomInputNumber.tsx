import { InputNumber } from "primereact/inputnumber"
import { useState } from "react"

export interface CustomInputNumberProps {
   inputId: string
   onChange: (value: number) => void
}

const CustomInputNumber = (props: CustomInputNumberProps) => {
   const [value, setValue] = useState(0)

   return (
      <InputNumber
         min={0}
         max={255}
         inputId={props.inputId}
         value={value}
         onValueChange={(event) => {
            const value =
               event.value === null || event.value === undefined
                  ? 0
                  : event.value
            setValue(value)
            props.onChange(value)
         }}
      />
   )
}

export { CustomInputNumber }
