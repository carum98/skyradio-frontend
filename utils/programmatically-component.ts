import { render, createApp } from 'vue'
import type { App } from 'vue'

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
    let app: App

    async function open(props: any = {}) {
        root = document.createElement('div')
        document.body.appendChild(root)

        const componentRoot = await component
        const componentData = await params.component()

        const instance = defineNuxtComponent({
            render: () => h(componentRoot.default, {
                onClose: destroy
            }, () => [
                h(componentData.default, {
                    ...params.props,
                    ...params.listeners,
                    ...props,
                    onClose: destroy
                })
            ]),
        })

        const router = useRouter()

        app = createApp(instance).use(router)
        
        app.mount(root)
    }

    function destroy() {
        render(null, root)
        app.unmount()
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