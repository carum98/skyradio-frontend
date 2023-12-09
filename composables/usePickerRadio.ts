import { withQuery } from 'ufo'

type OpenParams = {
    radio?: IRadio
    filters?: Record<string, any>
}

export function usePickerRadio(path: string) {
    const { open: openModal } = useModal({
        component: () => import('@views/picker-radio.vue'),
    })

    async function open(params?: OpenParams): Promise<IRadio> {
        const { radio, filters } = params || {}
        
        return new Promise(resolve => {
            openModal({
                props: {
                    radio,
                    path: withQuery(path, {
                        ...filters,
                    })
                },
                listeners: {
                    onSelected: (radio: IRadio) => {
                        resolve(radio)
                    }
                }
            })
        })
    }

    return {
        open
    }
}