import { createVNode, render } from 'vue'

interface ModalProps {
    component: Promise<typeof import("*.vue")>
    props: Object
}

export async function useModal(config: ModalProps) {
    const modal = await import(`../components/SkModal/Index.vue`)
    const componentData = await config.component

    const div = document.createElement('div')
    document.body.appendChild(div)

    let vNode = createVNode(modal.default, {
        close: destroy
    })

    vNode.children = [
        createVNode(componentData.default)
    ]

    render(vNode, div)

    function destroy() {
        render(null, div)
        div.remove()
    }

    return {
        destroy
    }
}
