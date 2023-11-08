export default function(event: ToggleEvent) {
    const target = event.target as HTMLElement

    const anchorId = target.attributes.getNamedItem('anchor')

    if (anchorId) {
        const anchor = document.getElementById(anchorId.value)

        if (anchor) {
            const anchorPosition = anchor.getBoundingClientRect()

            const overflowRight = anchorPosition.right + target.offsetWidth > window.innerWidth

            const anchorBottom = anchorPosition.bottom + window.pageYOffset
            const anchorLeft = anchorPosition.left + (overflowRight ? window.pageXOffset - target.offsetWidth + anchor.offsetWidth : 0)

            target.style.top = `${anchorBottom}px`
            target.style.left = `${anchorLeft}px`
        }
    }
}