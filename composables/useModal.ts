import { createVNode, render } from 'vue'

type UseModalOptions = {
    component: () => Promise<any>
    props?: Record<string, any>
    listeners?: Record<string, any>
}

interface UseModalReturnType {
    open: (props: any | null) => Promise<void>
    close: () => void
}

export function useModal(params: UseModalOptions): UseModalReturnType {
    let root: HTMLDivElement
    let instance: VNode

    async function open(props: any = {}) {
        root = document.createElement('div')

        const modal = await import(`@components/SkModal/Index.vue`)
        const componentData = await params.component()
    
        instance = createVNode(modal.default, {
            close: destroy
        })
    
        instance.children = [
            createVNode(componentData.default, {
                ...params.props,
                ...params.listeners,
                ...props,
                onClose: destroy
            })
        ]
    
        document.body.appendChild(root)
        render(instance, root)
    }

    function destroy() {
        render(null, root)
        root.remove()
    }

    function close() {
        destroy()
    }

    return {
        open,
        close
    }
}
