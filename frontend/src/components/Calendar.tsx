import { DayPicker, getDefaultClassNames } from "@daypicker/react"
import { es } from "date-fns/locale"
import "@daypicker/react/dist/style.css"

type Props = {
    selected: Date | undefined
    onSelect: (date: Date | undefined) => void
    disabledDaysOfWeek?: number[]
}

export default function Calendar({ selected, onSelect, disabledDaysOfWeek = [] }: Props) {
    const today = new Date()
    const defaultClassNames = getDefaultClassNames()

    return (
        <DayPicker
            locale={es}
            animate
            mode="single"
            selected={selected}
            onSelect={onSelect}
            disabled={[
                { before: today },
                { dayOfWeek: disabledDaysOfWeek },
            ]}
            classNames={{
                root: `${defaultClassNames.root} bg-[#f8f9fa] rounded-2xl p-6 font-sans inline-block`,
                month_caption: `${defaultClassNames.month_caption} flex justify-center font-semibold text-[1.125rem] text-gray-900 capitalize mb-4`,
                nav: `${defaultClassNames.nav} absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none`,
                button_previous: `${defaultClassNames.button_previous} pointer-events-auto`,
                button_next: `${defaultClassNames.button_next} pointer-events-auto`,
                chevron: `${defaultClassNames.chevron} w-5 h-5 fill-gray-400`,
                weekday: `${defaultClassNames.weekday} text-gray-400 uppercase font-semibold text-xs pb-4`,
                day: `${defaultClassNames.day} p-0 text-gray-900 font-medium text-[0.95rem]`,
                day_button: `${defaultClassNames.day_button} !w-14 !h-9 !border-none flex items-center justify-center transition-all duration-200 hover:bg-gray-200 !rounded-lg [.rdp-selected_&]:!bg-custom-blue [.rdp-selected_&]:!text-white [.rdp-selected_&]:hover:!bg-custom-blue [.rdp-selected_&]:shadow-md`,
                selected: `${defaultClassNames.selected} font-semibold`,
                outside: `${defaultClassNames.outside} text-gray-300`,
                disabled: `${defaultClassNames.disabled} opacity-50`,
            }}
        />
    )
}