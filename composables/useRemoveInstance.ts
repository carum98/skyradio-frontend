export function useRemoveInstance(name: string) {
    const router = useRouter()

    const { open, close } = useModal({
        component: import('@views/remove-confirmation.vue'),
        props: {
            name,
            onUpdate() {
                router.back()
                close()
            },
            onDiscard() {
                close()
            }
        }
    })

    return {
        openRevemoInstance: open,
    }
}