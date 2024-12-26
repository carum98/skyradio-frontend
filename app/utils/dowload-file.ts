export function dowloadFile({ data, name }: { data: any, name: string }) {
    const blob = new Blob([data], { type: 'application/octet-stream' })

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()

    window.URL.revokeObjectURL(url)
}