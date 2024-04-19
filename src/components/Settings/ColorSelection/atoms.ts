import { atom } from "jotai"
import { ColoringSettingsColor } from "../../../utils/ColoringSettings"

const colorSelectionSelectedColorAtom = atom<ColoringSettingsColor | null>(null)

export { colorSelectionSelectedColorAtom }
