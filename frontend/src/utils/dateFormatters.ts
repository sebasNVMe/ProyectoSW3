/** Formatea "YYYY-MM-DD" como "Lunes, 15 de noviembre de 2026" (locale es-CO) */
export function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const formatted = date.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return formatted ? formatted.charAt(0).toUpperCase() + formatted.slice(1) : ''
}

/** Formatea "YYYY-MM-DD" como "Lun, 15 Oct" (locale es-CO, formato corto) */
export function formatShortDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)

    const capitalize = (str: string) => {
        const clean = str.replace(/\./g, '')
        return clean.charAt(0).toUpperCase() + clean.slice(1)
    }

    const weekday = capitalize(date.toLocaleDateString('es-CO', { weekday: 'short' }))
    const dayNum = date.getDate().toString().padStart(2, '0')
    const monthName = capitalize(date.toLocaleDateString('es-CO', { month: 'short' }))

    return `${weekday}, ${dayNum} ${monthName}`
}

/** Formatea "HH:mm:ss" o "HH:mm" como "08:00 AM" */
export function formatTime(timeStr: string): string {
    const [hStr, mStr] = timeStr.split(':')
    const h = parseInt(hStr, 10)
    const period = h < 12 ? 'AM' : 'PM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    return `${String(h12).padStart(2, '0')}:${mStr} ${period}`
}
