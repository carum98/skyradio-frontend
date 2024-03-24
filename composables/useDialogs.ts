import type { ProgrammaticallyProps } from '@utils/programmatically-component'

export type DialogNames = 
    // Apps
    | 'apps-form' 
    // Clients
    | 'clients-form' 
    | 'clients-report'
    // Radios
    | 'radios-form'
    // SIMs
    | 'sims-form'
    // Consoles
    | 'consoles-form'
    // Licenses
    | 'licenses-form'
    // Modalities
    | 'modalities-form'
    // Models
    | 'models-form'
    // Providers
    | 'providers-form'
    // Sellers
    | 'sellers-form'
    // Status
    | 'status-form'
    // Reports
    | 'reports-clients'
    | 'reports-inventory'
    | 'reports-model'
    | 'reports-provider'
    | 'reports-seller'

type PushOptions = {
    name: DialogNames
} & ProgrammaticallyOptions

export const dialogs: PushOptions[] = [
    {
        name: 'apps-form',
        component: () => import('@pages/apps/form.dialog.vue'),
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
        name: 'sims-form',
        component: () => import('@pages/sims/form.dialog.vue'),
        rootProps: {
            width: 300
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
        name: 'models-form',
        component: () => import('@pages/models/form.dialog.vue'),
        rootProps: {
            width: 310
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
        name: 'sellers-form',
        component: () => import('@pages/sellers/form.dialog.vue'),
        rootProps: {
            width: 310
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

export function useDialogs() {
    function push(options: Omit<PushOptions, 'component'>) {
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

    return {
        push,
    }
}
