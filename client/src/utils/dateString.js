export const dateToString = date => {
    const pad = num => num.toString().padStart(2, '0')
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
}
export const stringToDate = str => {
    try {
        const [year, month, day] = str.split('-')
        const date = new Date(year, month - 1, day)
        if(isNaN(date.getTime())) return null

        return dateToString(date) === str ? date : null
    } catch (e) {
        return null
    }
}


