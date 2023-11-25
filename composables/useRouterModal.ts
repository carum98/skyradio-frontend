const routes = [
    {
        name: 'profile-radio',
        component: () => import('@views/profile-radio.vue')
    },
    {
        name: 'profile-sim',
        component: () => import('@views/profile-sim.vue')
    }
] as const

type PickPartial<T, K extends keyof T> = {[P in K]: Partial<T[P]>}

type PushParams = {
    name: typeof routes[number]['name']
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