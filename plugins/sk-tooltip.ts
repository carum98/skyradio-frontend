export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('sk-tooltip', {
        mounted(el, binding) {
            const { value } = binding

            el._sk_tooltip = new SkTooltip(el, value)
        },
        unmounted(el) {
            el._sk_tooltip?.dispose()
            delete el._sk_tooltip
        }
    })
})

class SkTooltip {
    private tooltip: HTMLElement | null = null
    private id = 'sk-tooltip__' + Math.random().toString(36).substring(2, 10)

    constructor(
        private readonly el: HTMLElement, 
        private readonly text: string,
    ) {
        this.el.setAttribute('popovertarget', this.id)
        this.el.setAttribute('id', this.id + '-anchor')

        this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    }

    private onMouseEnter(event: MouseEvent) {
        this.tooltip = document.createElement('div')
        this.tooltip.classList.add('sk-tooltip')
        this.tooltip.setAttribute('id', this.id)
        this.tooltip.setAttribute('popover', '')
        this.tooltip.setAttribute('anchor', this.id + '-anchor')
        this.tooltip.innerText = this.text

        this.el.parentNode?.insertBefore(this.tooltip, this.el.nextSibling)

        event.target?.addEventListener('mouseleave', () => {
            this.tooltip?.hidePopover()
            this.tooltip?.remove()
        }, { once: true })

        this.tooltip.addEventListener('toggle', this.positionTooltip.bind(this))

        this.tooltip.showPopover()
    }

    private positionTooltip(event: Event) {
        let { newState } = event as ToggleEvent

        if (newState === 'open') {
            // if (!("anchorName" in document.documentElement.style)) {
                cssAnchorPosition(event as ToggleEvent, 'top')
            // }
        }
    }

    dispose() {
        this.el.removeEventListener('mouseenter', this.onMouseEnter.bind(this))
        this.tooltip?.removeEventListener('toggle', this.positionTooltip.bind(this))
    }
}