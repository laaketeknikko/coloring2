import { PrimeIcons } from "primereact/api"
import { Button } from "primereact/button"

export interface RemoveButtonProps {
   onRemove: (id: string) => void
   id?: string
}

const RemoveButton = ({ id = "", onRemove }: RemoveButtonProps) => {
   return (
      <Button
         className=""
         icon={`${PrimeIcons.TIMES} text-xl font-light`}
         onClick={() => {
            onRemove(id)
         }}
      ></Button>
   )
}

export { RemoveButton }
