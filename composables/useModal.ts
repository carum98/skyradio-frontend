import { createVNode, render } from 'vue'

type UseModalOptions = {
    component: Promise<any>
    props: any
}

interface UseModalReturnType {
    open: () => Promise<void>
    close: () => void
}

export function useModal(params: UseModalOptions): UseModalReturnType {
    let root: HTMLDivElement
    let instance: VNode

    async function create() {
        root = document.createElement('div')

        const modal = await import(`@components/SkModal/Index.vue`)
        const componentData = await params.component
    
        instance = createVNode(modal.default, {
            close: destroy
        })
    
        instance.children = [
            createVNode(componentData.default, params.props)
        ]
    
        document.body.appendChild(root)
        render(instance, root)
    }

    function destroy() {
        render(null, root)
        root.remove()
    }

    async function open() {
        await create()
    }

    function close() {
        destroy()
    }

    return {
        open,
        close
    }
}
