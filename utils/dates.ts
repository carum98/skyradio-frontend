export function formatDate(date: Date) {
    return date.toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })
}