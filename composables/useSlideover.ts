import type { ProgrammaticallyOptions, ProgrammaticallyReturnType } from '@utils/programmatically-component'

export function useSlideover(params: ProgrammaticallyOptions): ProgrammaticallyReturnType {
    return programmaticallyComponent({
        params,
        component: import('@components/SkSlideover.vue')
    })
}