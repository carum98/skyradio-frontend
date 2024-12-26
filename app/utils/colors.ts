export const colors = [
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#9400D3',
    '#FF00FF',
    '#FFC0CB',
    '#FFA500',
    '#A52A2A',
    '#800000',
    '#808000',
    '#008000',
    '#000080',
]

export function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}