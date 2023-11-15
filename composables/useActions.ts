type ActionsName = 
    'swap' 
    | 'add' 
    | 'remove' 
    | 'add-client' 
    | 'create-radio' 
    | 'update-radio' 
    | 'remove-radio' 
    | 'create-client'
    | 'update-client'
    | 'remove-client'
    | 'create-modality'
    | 'update-modality'
    | 'remove-modality'
    | 'create-model'
    | 'update-model'
    | 'remove-model'
    | 'create-status'
    | 'update-status'
    | 'remove-status'
    | 'create-seller'
    | 'update-seller'
    | 'remove-seller'
    | 'create-provider'
    | 'update-provider'
    | 'remove-provider'
    | 'create-sim'
    | 'update-sim'
    | 'remove-sim'

export function useActions(onRefresh: () => void) {
    const { open: openSwap } = useModal({
        component: () => import('@views/swap-radio.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: openAdd } = useModal({
        component: () => import('@views/add-radio.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: openRemove } = useModal({
        component: () => import('@views/remove-radio.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: openAddClient } = useModal({
        component: () => import('@views/add-client.vue'),
        listeners: {
            onRefresh
        }
    })

    const radio = useModal({
        component: () => import('@views/form-radio.vue'),
        listeners: {
            onRefresh
        }
    })

    const sim = useModal({
        component: () => import('@views/form-sim.vue'),
        listeners: {
            onRefresh
        }
    })

    const client = useModal({
        component: () => import('@views/form-client.vue'),
        listeners: {
            onRefresh
        }
    })

    const modality = useModal({
        component: () => import('@views/form-modality.vue'),
        listeners: {
            onRefresh
        }
    })

    const model = useModal({
        component: () => import('@views/form-model.vue'),
        listeners: {
            onRefresh
        }
    })

    const status = useModal({
        component: () => import('@views/form-status.vue'),
        listeners: {
            onRefresh
        }
    })

    const seller = useModal({
        component: () => import('@views/form-seller.vue'),
        listeners: {
            onRefresh
        }
    })
    
    const provider = useModal({
        component: () => import('@views/form-provider.vue'),
        listeners: {
            onRefresh
        }
    })

    const remove = useModal({
        component: () => import('@views/delete-instance.vue'),
        listeners: {
            onRefresh
        }
    })

    function navigateToAction({ name, props } : { name: ActionsName, props?: Record<string, any> }) {
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
            case 'update-radio':
                radio.open(props)
                break
            case 'remove-radio':
                remove.open({
                    name: 'Radio',
                    path: `/api/radios/${props?.code}`
                })
                break
            case 'create-client':
            case 'update-client':
                client.open(props)
                break
            case 'remove-client':
                remove.open({
                    name: 'Cliente',
                    path: `/api/clients/${props?.code}`
                })
                break
            case 'create-sim':
            case 'update-sim':
                sim.open(props)
                break
            case 'remove-sim':
                remove.open({
                    name: 'Sim',
                    path: `/api/sims/${props?.code}`
                })
                break
            case 'create-modality':
            case 'update-modality':
                modality.open(props)
                break
            case 'remove-modality':
                remove.open({
                    name: 'Modalidad',
                    path: `/api/clients-modality/${props?.code}`
                })
                break
            case 'create-model':
            case 'update-model':
                model.open(props)
                break
            case 'remove-model':
                remove.open({
                    name: 'Model',
                    path: `/api/radios-model/${props?.code}`
                })
                break
            case 'create-status':
            case 'update-status':
                status.open(props)
                break
            case 'remove-status':
                remove.open({
                    name: 'Estado',
                    path: `/api/radios-status/${props?.code}`
                })
                break
            case 'create-seller':
            case 'update-seller':
                seller.open(props)
                break
            case 'remove-seller':
                remove.open({
                    name: 'Vendedor',
                    path: `/api/sellers/${props?.code}`
                })
                break
            case 'create-provider':
            case 'update-provider':
                provider.open(props)
                break
            case 'remove-provider':
                remove.open({
                    name: 'Proveedor',
                    path: `/api/sims-provider/${props?.code}`
                })
                break
        }
    }

    return {
        navigateToAction,
    }
}