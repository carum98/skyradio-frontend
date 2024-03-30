export function useLogs(name: 'clients' | 'radios' | 'sims' | 'apps') {

    const slideover = useSlideover({
        component: () => import('@views/logs.vue'),
    })

    function open(code: string) {
        const path = `/api/${name}/${code}/logs`

        slideover.open({
            props: {
                path
            }
        })
    }

    return {
        open,
    }
}