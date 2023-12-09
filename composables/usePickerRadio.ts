export function usePickerRadio(path: string) {
    const { open: openModal } = useModal({
        component: () => import('@views/picker-radio.vue'),
        props: {
            path
        }
    })

    async function open(radio?: IRadio): Promise<IRadio> {
        return new Promise(resolve => {
            openModal({
                props: {
                    radio
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