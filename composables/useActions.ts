type ActionsName = 
    'swap-radio' 
    | 'add-radios' 
    | 'remove-radio' 
    | 'add-client' 
    | 'remove-radio2' 
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
    | 'create-license'
    | 'update-license'
    | 'remove-license'
    | 'add-sim'
    | 'swap-sim'
    | 'remove-sim2'
    | 'add-radio'
    | 'edit-status'
    | 'remove-console'

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

    const sim = useModal({
        component: () => import('@views/form-sim.vue'),
        rootProps: {
            width: 300
        },
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

    const license = useModal({
        component: () => import('@views/form-license.vue'),
        rootProps: {
            width: 300
        },
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
            case 'remove-radio2':
                remove.open({
                    props: {
                        name: 'Radio',
                        path: `/api/radios/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'remove-client':
                remove.open({
                    props: {
                        name: 'Cliente',
                        path: `/api/clients/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'create-sim':
            case 'update-sim':
                sim.open({ props })
                break
            case 'remove-sim':
                remove.open({
                    props: {
                        name: 'Sim',
                        path: `/api/sims/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'create-modality':
            case 'update-modality':
                modality.open({ props })
                break
            case 'remove-modality':
                remove.open({
                    props: {
                        name: 'Modalidad',
                        path: `/api/clients-modality/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'create-model':
            case 'update-model':
                model.open({ props })
                break
            case 'remove-model':
                remove.open({
                    props: {
                        name: 'Model',
                        path: `/api/radios-model/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'create-status':
            case 'update-status':
                status.open({ props })
                break
            case 'remove-status':
                remove.open({
                    props: {
                        name: 'Estado',
                        path: `/api/radios-status/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'create-seller':
            case 'update-seller':
                seller.open({ props })
                break
            case 'remove-seller':
                remove.open({
                    props: {
                        name: 'Vendedor',
                        path: `/api/sellers/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'create-license':
            case 'update-license':
                license.open({ props })
                break
            case 'remove-license':
                remove.open({
                    props: {
                        name: 'Licensia',
                        path: `/api/licenses/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'create-provider':
            case 'update-provider':
                provider.open({ props })
                break
            case 'remove-provider':
                remove.open({
                    props: {
                        name: 'Proveedor',
                        path: `/api/sims-provider/${props?.code}`,
                        ...props
                    }
                })
                break
            case 'remove-console':
                remove.open({
                    props: {
                        name: 'Consola',
                        path: `/api/consoles/${props?.code}`,
                        ...props
                    }
                })
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
        }
    }

    return {
        navigateToAction,
    }
}