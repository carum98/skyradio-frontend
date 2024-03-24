import type { ProgrammaticallyProps } from '@utils/programmatically-component'

export type DialogNames = 'apps-form' | 'clients-form' 

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
        component: () => import('@pages/clients/form-client.dialog.vue'),
        rootProps: {
            width: 350
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
