export function useTablePerPage({ sm, lg }: { sm: number, lg: number }) {
    const height = useCookie('height')

    return Number(height.value) > 800 ? lg : sm
}