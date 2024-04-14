import { PrimeIcons } from "primereact/api"
import { Button } from "primereact/button"
import { OverlayPanel } from "primereact/overlaypanel"
import { PropsWithChildren, useRef } from "react"

export interface HelpButtonProps {
   size: "small" | "large"
}

const HelpButton = ({ size, children }: PropsWithChildren<HelpButtonProps>) => {
   const overlayRef = useRef<OverlayPanel>(null)

   return (
      <>
         <Button
            onClick={(e) => overlayRef.current!.toggle(e)}
            style={{ aspectRatio: 1 }}
            size={size}
            className="border-circle bg-blue-200 border-0"
            icon={`${PrimeIcons.INFO_CIRCLE} text-2xl text-white`}
         ></Button>
         <OverlayPanel ref={overlayRef}>{children}</OverlayPanel>
      </>
   )
}

export { HelpButton }
