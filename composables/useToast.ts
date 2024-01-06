import { render, createApp } from 'vue'

export interface SkToastProps {
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
}

export function useToast() {
    async function open(params: SkToastProps) {
        let count = document.querySelectorAll('.sk-toast').length
        let initialTop = 20
        let top = count * 90 + initialTop

        let root = document.createElement('div')
        document.body.appendChild(root)

        const component = await import('@components/SkToast.vue')

        const instance = defineNuxtComponent({
            render: () => h(component.default, {
                ...params,
                onClose: () => {
                    render(null, root)
                    app.unmount()
                    root.remove()
                }
            })
        })

        let app = createApp(instance)
        app.mount(root)

        // Set the initial top position
        let popover = root.querySelector('.sk-toast') as HTMLElement
        if (popover) {
            popover.style.top = `${top}px`
        }
    }

    return {
        open,
    }
}
