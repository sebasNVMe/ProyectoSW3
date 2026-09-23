/** Convierte "HH:mm" o "HH:mm:ss" a minutos desde medianoche */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/** Convierte minutos desde medianoche de vuelta a "HH:mm:ss" */
export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}

export function addMinutes(time: string, minutesToAdd: number): string {
  return minutesToTime(timeToMinutes(time) + minutesToAdd);
}

export function isBefore(time1: string, time2: string): boolean {
  return timeToMinutes(time1) < timeToMinutes(time2);
}

export function isAfter(time1: string, time2: string): boolean {
  return timeToMinutes(time1) > timeToMinutes(time2);
}

const DAY_NAMES = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

/** Convierte "SATURDAY,SUNDAY" en JS Date.getDay() → [0, 6] */
export function parseUnavailableDays(
  unavailableDays: string | null | undefined,
): number[] {
  if (!unavailableDays) return [];
  return unavailableDays
    .split(',')
    .map((d) => DAY_NAMES.indexOf(d.trim().toUpperCase()))
    .filter((i) => i !== -1);
}

export function getDayOfWeek(dateStr: string): number {
  return new Date(`${dateStr}T00:00:00`).getDay(); // 0=domingo ... 6=sábado
}

export function isWeekend(dateStr: string): boolean {
  const day = getDayOfWeek(dateStr);
  return day === 0 || day === 6;
}