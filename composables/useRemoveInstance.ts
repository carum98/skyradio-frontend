export function useRemoveInstance(name: string, onCallback: () => void) {
    const { open, close } = useModal({
        component: import('@views/delete-instance.vue'),
        props: {
            name,
            onUpdate() {
                onCallback()
                close()
            },
            onDiscard() {
                close()
            }
        }
    })

    return {
        openRemoveInstance: open,
    }
}