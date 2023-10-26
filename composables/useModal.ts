import { createVNode, render } from 'vue'

type UseModalOptions = {
    component: Promise<typeof import("*.vue")>
    props: any
}

interface UseModalReturnType {
    open: () => Promise<void>
    close: () => void
}

export function useModal(params: UseModalOptions): UseModalReturnType {
    const root = document.createElement('div')
    let instance: VNode

    async function create() {
        const modal = await import(`../components/SkModal/Index.vue`)
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
