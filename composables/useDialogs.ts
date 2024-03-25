import type { ProgrammaticallyOptions } from '@utils/programmatically-component'

type Instances =
    | 'apps'
    | 'clients'
    | 'radios'
    | 'sims'
    | 'consoles'
    | 'licenses'
    | 'modalities'
    | 'models'
    | 'providers'
    | 'sellers'
    | 'status'

export type DialogNames = 
    // Apps
    | 'apps-form' 
    // Clients
    | 'clients-form' 
    | 'clients-report'
    // Radios
    | 'radios-form'
    | 'radios-profile'
    // SIMs
    | 'sims-form'
    | 'sims-profile'
    // Consoles
    | 'consoles-form'
    // Licenses
    | 'licenses-form'
    // Modalities
    | 'modalities-form'
    | 'modalities-profile'
    // Models
    | 'models-form'
    | 'models-profile'
    // Providers
    | 'providers-form'
    | 'providers-profile'
    // Sellers
    | 'sellers-form'
    | 'sellers-profile'
    // Status
    | 'status-form'
    | 'status-profile'
    // Reports
    | 'reports-clients'
    | 'reports-inventory'
    | 'reports-model'
    | 'reports-provider'
    | 'reports-seller'

type DialogsOptions = {
    name: DialogNames
} & ProgrammaticallyOptions

type RemoveOptions = {
    instance: Instances
    name: string
    path: string
}

export type PushOptions = Omit<DialogsOptions, 'component'>

const dialogs: DialogsOptions[] = [
    {
        name: 'apps-form',
        component: () => import('@pages/apps/form.dialog.vue'),
        rootProps: {
            width: 300
        }
    },
    {
        name: 'clients-form',
        component: () => import('@pages/clients/form.dialog.vue'),
        rootProps: {
            width: 350
        }
    },
    {
        name: 'consoles-form',
        component: () => import('@pages/consoles/form.dialog.vue'),
        rootProps: {
            width: 300
        }
    },
    {
        name: 'radios-form',
        component: () => import('@pages/radios/form.dialog.vue'),
        rootProps: {
            width: 300
        }
    },
    {
        name: 'radios-profile',
        component: () => import('@pages/radios/profile.dialog.vue'),
        rootProps: {
            width: 600
        }
    },
    {
        name: 'sims-form',
        component: () => import('@pages/sims/form.dialog.vue'),
        rootProps: {
            width: 300
        }
    },
    {
        name: 'sims-profile',
        component: () => import('@pages/sims/profile.dialog.vue'),
        rootProps: {
            width: 600
        }
    },
    {
        name: 'licenses-form',
        component: () => import('@pages/licenses/form.dialog.vue'),
        rootProps: {
            width: 300
        }
    },
    {
        name: 'modalities-form',
        component: () => import('@pages/modalities/form.dialog.vue'),
        rootProps: {
            width: 310
        }
    },
    {
        name: 'modalities-profile',
        component: () => import('@pages/modalities/profile.dialog.vue'),
        rootProps: {
            width: 800
        }
    },
    {
        name: 'models-form',
        component: () => import('@pages/models/form.dialog.vue'),
        rootProps: {
            width: 310
        }
    },
    {
        name: 'models-profile',
        component: () => import('@pages/models/profile.dialog.vue'),
        rootProps: {
            width: 800
        }
    },
    {
        name: 'providers-form',
        component: () => import('@pages/providers/form.dialog.vue'),
        rootProps: {
            width: 310
        }
    },
    {
        name: 'providers-profile',
        component: () => import('@pages/providers/profile.dialog.vue'),
        rootProps: {
            width: 800
        }
    },
    {
        name: 'sellers-form',
        component: () => import('@pages/sellers/form.dialog.vue'),
        rootProps: {
            width: 310
        }
    },
    {
        name: 'sellers-profile',
        component: () => import('@pages/sellers/profile.dialog.vue'),
        rootProps: {
            width: 800
        }
    },
    {
        name: 'status-form',
        component: () => import('@pages/status/form.dialog.vue'),
        rootProps: {
            width: 310
        }
    },
    {
        name: 'status-profile',
        component: () => import('@pages/status/profile.dialog.vue'),
        rootProps: {
            width: 800
        }
    },
    {
        name: 'reports-clients',
        component: () => import('@pages/reports/clients.dialog.vue'),
        rootProps: {
            width: 315
        }
    },
    {
        name: 'reports-inventory',
        component: () => import('@pages/reports/inventory.dialog.vue'),
        rootProps: {
            width: 315
        }
    },
    {
        name: 'reports-model',
        component: () => import('@pages/reports/model.dialog.vue'),
        rootProps: {
            width: 315
        }
    },
    {
        name: 'reports-provider',
        component: () => import('@pages/reports/provider.dialog.vue'),
        rootProps: {
            width: 315
        }
    },
    {
        name: 'reports-seller',
        component: () => import('@pages/reports/seller.dialog.vue'),
        rootProps: {
            width: 315
        }
    },
]

const options: RemoveOptions[] = [
    {
        instance: 'apps',
        name: 'Aplicación',
        path: '/api/apps/:code'
    },
    {
        instance: 'clients',
        name: 'Cliente',
        path: '/api/clients/:code'
    },
    {
        instance: 'radios',
        name: 'Radio',
        path: '/api/radios/:code'
    },
    {
        instance: 'sims',
        name: 'SIM',
        path: '/api/sims/:code'
    },
    {
        instance: 'consoles',
        name: 'Consola',
        path: '/api/consoles/:code'
    },
    {
        instance: 'licenses',
        name: 'Licencia',
        path: '/api/licenses/:code'
    },
    {
        instance: 'modalities',
        name: 'Modalidad',
        path: '/api/clients-modality/:code'
    },
    {
        instance: 'models',
        name: 'Modelo',
        path: '/api/models/:code'
    },
    {
        instance: 'providers',
        name: 'Proveedor',
        path: '/api/sims-provider/:code'
    },
    {
        instance: 'sellers',
        name: 'Vendedor',
        path: '/api/sellers/:code'
    },
    {
        instance: 'status',
        name: 'Estado',
        path: '/api/radios-status/:code'
    }
]

export function useDialogs() {
    function push(options: PushOptions) {
        const { name } = options
        const dialog = dialogs.find(dialog => dialog.name === name)

        if (!dialog) {
            throw new Error(`Dialog ${name} not found`)
        }

        const { open } = programmaticallyComponent({
            component: import("@components/SkModal.vue"),
            params: {
                component: dialog.component,
                props: {
                    ...dialog.props,
                    ...options.props,
                },
                listeners: {
                    ...dialog.listeners,
                    ...options.listeners,
                },
                rootProps: {
                    ...dialog.rootProps,
                    ...options.rootProps,
                }
            }
        })

        open({})
    }

    function confirmRemove({ name, code, callback }: { name: Instances, code: string, callback: Function }) {
        const option = options.find(option => option.instance === name)

        if (!option) {
            throw new Error('Invalid option')
        }

        const { open } = programmaticallyComponent({
            component: import("@components/SkModal.vue"),
            params: {
                component: () => import('@views/delete-instance.vue'),
                listeners: {
                    onRefresh: callback
                }
            }
        })

        open({
            props: {
                name: option.name,
                path: option.path,
                code
            }
        })
    }

    return {
        push,
        confirmRemove
    }
}
