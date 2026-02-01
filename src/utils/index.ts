import 'moment/locale/ar'
import moment from 'moment/moment'
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";

export function changeDateFormat(data: any, format: string = 'lll'): string {
    const { locale } = useLocaleSettings();

    if (data) {
        return moment(data).locale(locale.value.toLowerCase()).format(format)
    }
    return '—'
}

export function timeConvert(totalMinutes: number): { mdisplay: number; sdisplay: number } {
    const hours: number = Math.floor(totalMinutes / 60)
    const minutes: number = totalMinutes % 60
    const mdisplay: number = hours
    const sdisplay: number = minutes
    return { mdisplay, sdisplay }
}

export function formateNumbers(number: number) {
    return number.toLocaleString('en-US', {
        maximumFractionDigits: 1,
        notation: 'compact',
        compactDisplay: 'short'
    })
}