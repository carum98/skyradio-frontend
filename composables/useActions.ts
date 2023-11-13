export function useActions(onRefresh: () => void) {
    const { open: openSwap } = useModal({
        component: import('@views/swap-radio.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { open: openAdd } = useModal({
        component: import('@views/add-radio.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { open: openRemove } = useModal({
        component: import('@views/remove-radio.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { open: openAddClient } = useModal({
        component: import('@views/add-client.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { open: openCreateRadio } = useModal({
        component: import('@views/create-radio.vue'),
        listeners: {
            onCreated: () => onRefresh()
        }
    })
    
    const { open: openUpdateRadio } = useModal({
        component: import('@views/update-radio.vue'),
        listeners: {
            onUpdate: () => onRefresh()
        }
    })

    const { openRemoveInstance: openRemoveRadio } = useRemoveInstance('Radio', () => onRefresh())

    function navigateToAction({ name, props } : { name: string, props?: Record<string, any> }) {
        switch (name) {
            case 'swap':
                openSwap(props)
                break
            case 'add':
                openAdd(props)
                break
            case 'remove':
                openRemove(props)
                break
            case 'add-client':
                openAddClient(props)
                break
            case 'create-radio':
                openCreateRadio(props)
                break
            case 'update-radio':
                openUpdateRadio(props)
                break
            case 'remove-radio':
                openRemoveRadio(props)
                break
        }
    }

    return {
        OpenSwap: openSwap,
        OpenAdd: openAdd,
        OpenRemove: openRemove,
        OpenAddClient: openAddClient,

        navigateToAction,
    }
}