import type { ProgrammaticallyProps } from '@utils/programmatically-component'

export type DialogNames = 
    'apps-form' 
    | 'clients-form' 
    | 'clients-report'
    | 'reports-clients'
    | 'reports-inventory'
    | 'reports-model'
    | 'reports-provider'
    | 'reports-seller'

type PushOptions = {
    name: DialogNames
} & ProgrammaticallyProps

type Dialog = {
    name: DialogNames
    component: () => Promise<typeof import('*.vue')>
} & ProgrammaticallyProps

export const dialogs: Dialog[] = [
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

    return {
        push,
    }
}
