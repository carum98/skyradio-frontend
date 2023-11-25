const routes = [
    {
        name: 'profile-radio',
        component: () => import('@views/profile-radio.vue')
    },
    {
        name: 'profile-sim',
        component: () => import('@views/profile-sim.vue')
    },
    {
        name: 'profile-modality',
        component: () => import('@views/profile-modality.vue')
    },
    {
        name: 'profile-provider',
        component: () => import('@views/profile-provider.vue')
    },
    {
        name: 'profile-model',
        component: () => import('@views/profile-model.vue')
    },
    {
        name: 'profile-status',
        component: () => import('@views/profile-status.vue')
    }
] as const

type PickPartial<T, K extends keyof T> = {[P in K]: Partial<T[P]>}

export type RouterModalNames = typeof routes[number]['name']

export type PushParams = {
    name: RouterModalNames
} & PickPartial<ProgrammaticallyOptions, 'listeners' | 'props'>

export function useRouterModal() {
    function push({ name, props, listeners }: PushParams) {
        const route = routes.find(route => route.name === name)

        if (!route) {
            throw new Error(`Route ${name} not found`)
        }

        const { open } = useModal({
            component: route.component,
            props,
            listeners
        })

        open({})
    }

    return {
        push
    }
}