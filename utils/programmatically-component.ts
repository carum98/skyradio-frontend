import { createVNode, render } from 'vue'

export type ProgrammaticallyOptions = {
    component: () => Promise<any>
    props?: Record<string, any>
    listeners?: Record<string, any>
}

export interface ProgrammaticallyReturnType {
    open: (props: any | null) => Promise<void>
    close: () => void
}

export function programmaticallyComponent(
    { params, component }: { params: ProgrammaticallyOptions, component: Promise<typeof import("*.vue")> }
): ProgrammaticallyReturnType {
    let root: HTMLDivElement
    let instance: VNode

    async function open(props: any = {}) {
        root = document.createElement('div')

        const componentRoot = await component
        const componentData = await params.component()
    
        instance = createVNode(componentRoot.default, {
            close: destroy
        }, () => [
            createVNode(componentData.default, {
                ...params.props,
                ...params.listeners,
                ...props,
                onClose: destroy
            })
        ])
    
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