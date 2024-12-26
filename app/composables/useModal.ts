import type { ProgrammaticallyOptions, ProgrammaticallyReturnType } from '@utils/programmatically-component'

export function useModal(params: ProgrammaticallyOptions): ProgrammaticallyReturnType {
    return programmaticallyComponent({
        params,
        component: import('@components/SkModal.vue')
    })
}
