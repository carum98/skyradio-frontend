export default function(event: ToggleEvent) {
    const target = event.target as HTMLElement

    const anchorId = target.attributes.getNamedItem('anchor')

    if (anchorId) {
        const anchor = document.getElementById(anchorId.value)

        if (anchor) {
            const anchorPosition = anchor.getBoundingClientRect()

            const anchorBottom = anchorPosition.bottom + window.pageYOffset
            const anchorLeft = anchorPosition.left + window.pageXOffset

            target.style.top = `${anchorBottom}px`
            target.style.left = `${anchorLeft}px`
        }
    }
}