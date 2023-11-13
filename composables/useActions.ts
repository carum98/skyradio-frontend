export function useActions(onRefresh: () => void) {
    const { open: OpenSwap } = useModal({
        component: import('@views/swap-radio.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { open: OpenAdd } = useModal({
        component: import('@views/add-radio.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { open: OpenRemove } = useModal({
        component: import('@views/remove-radio.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { open: OpenAddClient } = useModal({
        component: import('@views/add-client.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    return {
        OpenSwap,
        OpenAdd,
        OpenRemove,
        OpenAddClient
    }
}