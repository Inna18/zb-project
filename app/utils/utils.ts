export const capitalize = (text: string|undefined) => {
    return text?text.charAt(0).toUpperCase() + text.slice(1):'';
}