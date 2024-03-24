import type { ProgrammaticallyProps } from '@utils/programmatically-component'
export type DialogNames = 'apps-form'

type Dialog = {
    name: DialogNames
    component: () => Promise<typeof import('*.vue')>
} & ProgrammaticallyProps

export const dialogs: Dialog[] = [
    {
        name: 'apps-form',
        component: () => import('@dialogs/apps/form.vue'),
    },
]
