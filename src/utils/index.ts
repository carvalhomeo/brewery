export function shortenText(text: string, size: number = 18) {
    return text.length < size ? text : text.substring(0, size).concat('...')
}