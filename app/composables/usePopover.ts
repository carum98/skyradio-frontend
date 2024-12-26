import type { ProgrammaticallyOptions, ProgrammaticallyReturnType } from '@utils/programmatically-component'

export function usePopover(params: ProgrammaticallyOptions): ProgrammaticallyReturnType {
    return programmaticallyComponent({
        params,
        component: import('@components/SkPopover.vue')
    })
}
