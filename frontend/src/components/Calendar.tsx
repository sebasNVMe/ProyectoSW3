import { DayPicker } from "@daypicker/react"
import { useState } from "react"

export default function Calendar() {
    const [selected, setSelected] = useState<Date>()
    return (
        <DayPicker
            animate
            mode="single"
            selected={selected}
            onSelect={setSelected}
        />
    )

}