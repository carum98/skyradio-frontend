import { withQuery } from 'ufo'

const pickers = [
    {
        name: 'radios',
        component: () => import('@components/Picker/Radios.vue')
    }
] as const

type PickersNames = typeof pickers[number]['name']

type OpenParams<T> = {
    name: PickersNames
    path: string
    value?: T
    filters?: Record<string, any>
}

export function usePicker<T>() {
    function open({ name, path, value, filters }: OpenParams<T>): Promise<T> {
        const picker = pickers.find(picker => picker.name === name)

        if (!picker) {
            throw new Error(`Picker ${name} not found`)
        }

        return new Promise(resolve => {
            const { open } = useModal({
                component: picker.component,
            })

            open({
                props: {
                    value,
                    path: withQuery(path, {
                        ...filters,
                    })
                },
                listeners: {
                    onSelected: (value: T) => {
                        resolve(value)
                    }
                }
            })
        })
    }

    return {
        open
    }
}