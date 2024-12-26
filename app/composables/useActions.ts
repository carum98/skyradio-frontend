type ActionsName = 
    'swap-radio' 
    | 'add-radios' 
    | 'remove-radio' 
    | 'add-client' 
    | 'add-sim'
    | 'swap-sim'
    | 'remove-sim2'
    | 'add-radio'
    | 'edit-status'
    | 'create-apps'

export function useActions(onRefresh: () => void) {
    const { open: openSwapRadio } = useModal({
        component: () => import('@views/swap-radio.vue'),
        rootProps: {
            width: 750
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openAddRadios } = useModal({
        component: () => import('@views/add-radios.vue'),
        rootProps: {
            width: 750
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openAddRadio } = useModal({
        component: () => import('@views/add-radio.vue'),
        rootProps: {
            width: 450
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openRemoveRadio } = useModal({
        component: () => import('@views/remove-radio.vue'),
        rootProps: {
            width: 750
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openAddClient } = useModal({
        component: () => import('@views/add-client.vue'),
        rootProps: {
            width: 350
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openAddSim } = useModal({
        component: () => import('@views/add-sim.vue'),
        rootProps: {
            width: 350
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openRemoveSim } = useModal({
        component: () => import('@views/remove-sim.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: openSwapSim } = useModal({
        component: () => import('@views/swap-sim.vue'),
        rootProps: {
            watch: 300
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openEditStatus } = useModal({
        component: () => import('@views/edit-status.vue'),
        rootProps: {
            width: 300
        },
        listeners: {
            onRefresh
        }
    })

    const { open: openCreateApps } = useModal({
        component: () => import('@views/create-apps.vue'),
        rootProps: {
            width: 600
        },
        listeners: {
            onRefresh
        }
    })

    function navigateToAction({ name, props } : { name: ActionsName, props?: Record<string, any> }) {
        switch (name) {
            case 'swap-radio':
                openSwapRadio({ props })
                break
            case 'add-radios':
                openAddRadios({ props })
                break
            case 'remove-radio':
                openRemoveRadio({ props })
                break
            case 'add-client':
                openAddClient({ props })
                break
            case 'add-sim':
                openAddSim({ props })
                break
            case 'remove-sim2':
                openRemoveSim({ props })
                break
            case 'add-radio':
                openAddRadio({ props })
                break
            case 'swap-sim':
                openSwapSim({ props })
                break
            case 'edit-status':
                openEditStatus({ props })
                break
            case 'create-apps':
                openCreateApps({ props })
                break
        }
    }

    return {
        navigateToAction,
    }
}