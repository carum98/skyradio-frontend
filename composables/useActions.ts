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

    const { open: openCreateRadio } = useModal({
        component: () => import('@views/create-radio.vue'),
        listeners: {
            onRefresh
        }
    })
    
    const { open: openUpdateRadio } = useModal({
        component: () => import('@views/update-radio.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenCreateClient } = useModal({
        component: () => import('@views/create-client.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenUpdateClient } = useModal({
        component: () => import('@views/update-client.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenUpsertModality } = useModal({
        component: () => import('@views/form-modality.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: openUpsertModel } = useModal({
        component: () => import('@views/form-model.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: openUpsertStatus } = useModal({
        component: () => import('@views/form-status.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: openUsertSeller } = useModal({
        component: () => import('@views/form-seller.vue'),
        listeners: {
            onRefresh
        }
    })
    
    const { open: OpenUsertProvider } = useModal({
        component: () => import('@views/form-provider.vue'),
        listeners: {
            onRefresh
        }
    })

    const { openRemoveInstance: openRemoveRadio } = useRemoveInstance('Radio', () => onRefresh())
    const { openRemoveInstance: openRemoveClient } = useRemoveInstance('Cliente', () => onRefresh())
    const { openRemoveInstance: openRemoveModality } = useRemoveInstance('Modality', () => onRefresh())
    const { openRemoveInstance: openRemoveModel } = useRemoveInstance('Model', () => onRefresh())
    const { openRemoveInstance: openRemoveStatus } = useRemoveInstance('Estado', () => onRefresh())
    const { openRemoveInstance: openRemoveSeller } = useRemoveInstance('Vendedor', () => onRefresh())
    const { openRemoveInstance: openRemoveProvider } = useRemoveInstance('Proveedor', () => onRefresh())

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
                openCreateRadio(props)
                break
            case 'update-radio':
                openUpdateRadio(props)
                break
            case 'remove-radio':
                openRemoveRadio(props)
                break
            case 'create-client':
                OpenCreateClient(props)
                break
            case 'update-client':
                OpenUpdateClient(props)
                break
            case 'remove-client':
                openRemoveClient(props)
                break
            case 'create-modality':
            case 'update-modality':
                OpenUpsertModality(props)
                break
            case 'remove-modality':
                openRemoveModality(props)
                break
            case 'create-model':
            case 'update-model':
                openUpsertModel(props)
                break
            case 'remove-model':
                openRemoveModel(props)
                break
            case 'create-status':
            case 'update-status':
                openUpsertStatus(props)
                break
            case 'remove-status':
                openRemoveStatus(props)
                break
            case 'create-seller':
            case 'update-seller':
                openUsertSeller(props)
                break
            case 'remove-seller':
                openRemoveSeller(props)
                break
            case 'create-provider':
            case 'update-provider':
                OpenUsertProvider(props)
                break
            case 'remove-provider':
                openRemoveProvider(props)
                break
        }
    }

    return {
        navigateToAction,
    }
}