export function useActions(onRefresh: () => void) {
    const { open: OpenSwap, close: CloseSwap } = useModal({
        component: import('@views/swap-radio.vue'),
        props: {
            onUpdate() {
                onRefresh()
                CloseSwap()
            }
        }
    })

    const { open: OpenAdd, close: CloseAdd } = useModal({
        component: import('@views/add-radio.vue'),
        props: {
            onUpdate() {
                onRefresh()
                CloseAdd()
            }
        }
    })

    const { open: OpenRemove, close: CloseRemove } = useModal({
        component: import('@views/remove-radio.vue'),
        props: {
            onUpdate() {
                onRefresh()
                CloseRemove()
            }
        }
    })

    return {
        OpenSwap,
        OpenAdd,
        OpenRemove
    }
}