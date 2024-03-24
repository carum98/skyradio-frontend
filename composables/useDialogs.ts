import type { ProgrammaticallyProps } from '@utils/programmatically-component'
import type { DialogNames } from '~/dialogs'
import { dialogs } from '~/dialogs'

type PushOptions = {
    name: DialogNames
} & ProgrammaticallyProps

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
