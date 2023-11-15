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

    const { open: OpenCreateModel } = useModal({
        component: () => import('@views/create-model.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenUpdateModel } = useModal({
        component: () => import('@views/update-model.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenCreateStatus } = useModal({
        component: () => import('@views/create-status.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenUpdateStatus } = useModal({
        component: () => import('@views/update-status.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenCreateSeller } = useModal({
        component: () => import('@views/create-seller.vue'),
        listeners: {
            onRefresh
        }
    })
    
    const { open: OpenUpdateSeller } = useModal({
        component: () => import('@views/update-seller.vue'),
        listeners: {
            onRefresh
        }
    })

    const { open: OpenCreateProvider } = useModal({
        component: () => import('@views/create-provider.vue'),
        listeners: {
            onRefresh
        }
    })
    
    const { open: OpenUpdateProvider } = useModal({
        component: () => import('@views/update-provider.vue'),
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
                OpenCreateModel(props)
                break
            case 'update-model':
                OpenUpdateModel(props)
                break
            case 'remove-model':
                openRemoveModel(props)
                break
            case 'create-status':
                OpenCreateStatus(props)
                break
            case 'update-status':
                OpenUpdateStatus(props)
                break
            case 'remove-status':
                openRemoveStatus(props)
                break
            case 'create-seller':
                OpenCreateSeller(props)
                break
            case 'update-seller':
                OpenUpdateSeller(props)
                break
            case 'remove-seller':
                openRemoveSeller(props)
                break
            case 'create-provider':
                OpenCreateProvider(props)
                break
            case 'update-provider':
                OpenUpdateProvider(props)
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