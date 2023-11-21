import type { ProgrammaticallyOptions, ProgrammaticallyReturnType } from '@utils/programmatically-component'

export function useSlideover(params: ProgrammaticallyOptions): ProgrammaticallyReturnType {
    const nuxtApp = useNuxtApp()

    return programmaticallyComponent({
        params: {
            ...params,
            props: {
                ...params.props,
                app: nuxtApp
            }
        },
        component: import('@components/SkSlideover.vue')
    })
}