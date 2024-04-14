import { PrimeIcons } from "primereact/api"
import { Button } from "primereact/button"
import { OverlayPanel } from "primereact/overlaypanel"
import { PropsWithChildren, useRef } from "react"

export interface HelpButtonProps {
   size: "small" | "large"
   iconSize?: string
   height?: string
}

const HelpButton = ({
   size,
   iconSize = "text-md",
   children,
   height = "1.3rem",
}: PropsWithChildren<HelpButtonProps>) => {
   const overlayRef = useRef<OverlayPanel>(null)

   return (
      <>
         <Button
            onPointerEnter={(e) => overlayRef.current!.toggle(e)}
            onPointerLeave={(e) => overlayRef.current!.toggle(e)}
            onClick={(e) => overlayRef.current!.toggle(e)}
            style={{ aspectRatio: 1, height: height, width: height }}
            size={size}
            className={`border-circle bg-blue-200 border-0 p-1`}
            icon={`${PrimeIcons.INFO_CIRCLE} ${iconSize} text-white`}
         ></Button>
         <OverlayPanel ref={overlayRef}>{children}</OverlayPanel>
      </>
   )
}

export { HelpButton }
