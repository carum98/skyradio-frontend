export function useLogs(name: 'clients' | 'radios' | 'sims') {

    const model = useModal({
        component: () => import('@views/logs.vue'),
    })

    function open(code: string) {
        const path = `/api/${name}/${code}/logs`

        model.open({
            path
        })
    }

    return {
        open,
    }
}