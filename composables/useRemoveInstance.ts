export function useRemoveInstance(name: string, onCallback: () => void) {
    const { open } = useModal({
        component: import('@views/delete-instance.vue'),
        props: {
            name,
        },
        listeners: {
            onUpdate: () => onCallback()
        }
    })

    return {
        openRemoveInstance: open,
    }
}