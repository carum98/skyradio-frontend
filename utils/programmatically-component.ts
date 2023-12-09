import { render, createApp } from 'vue'
import type { App } from 'vue'

export type ProgrammaticallyOptions = {
    component: () => Promise<any>
    props?: Record<string, any>
    listeners?: Record<string, any>
}

export type ProgrammaticallyProps = {
    props?: Record<string, any>
    rootProps?: Record<string, any>
    listeners?: Record<string, any>
}

export interface ProgrammaticallyReturnType {
    open: (params: ProgrammaticallyProps) => Promise<void>
    close: () => void
}

export function programmaticallyComponent(
    { params, component }: { params: ProgrammaticallyOptions, component: Promise<typeof import("*.vue")> }
): ProgrammaticallyReturnType {
    let root: HTMLDivElement
    let app: App

    async function open(propsParams: ProgrammaticallyProps) {
        const { props = {}, rootProps = {}, listeners = {} } = propsParams

        root = document.createElement('div')
        document.body.appendChild(root)

        const componentRoot = await component
        const componentData = await params.component()

        const instance = defineNuxtComponent({
            render: () => h(componentRoot.default, {
                ...rootProps,
                onClose: destroy
            }, () => [
                h(componentData.default, {
                    ...params.props,
                    ...params.listeners,
                    ...props,
                    ...listeners,
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