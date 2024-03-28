export default function(event: ToggleEvent, position: 'top' | 'bottom' | 'left' | 'right' = 'bottom') {
    const target = event.target as HTMLElement

    const anchorId = target.attributes.getNamedItem('anchor')

    if (anchorId) {
        const anchor = document.getElementById(anchorId.value)

        if (anchor) {
            const anchorPosition = anchor.getBoundingClientRect()

            const overflowRight = anchorPosition.right + target.offsetWidth > window.innerWidth
            const overflowLeft = anchorPosition.left - target.offsetWidth < 0
            const overflowTop = anchorPosition.top - target.offsetHeight < 0
            const overflowBottom = anchorPosition.bottom + target.offsetHeight > window.innerHeight

            const anchorBottom = anchorPosition.bottom + (overflowBottom ? window.pageYOffset - target.offsetHeight + anchor.offsetHeight : 0)
            const anchorLeft = anchorPosition.left + (overflowRight ? window.pageXOffset - target.offsetWidth + anchor.offsetWidth : 0)
            const anchorRight = anchorPosition.right + (overflowLeft ? window.pageXOffset - target.offsetWidth + anchor.offsetWidth : 0)
            const anchorTop = anchorPosition.top + (overflowTop ? window.pageYOffset - target.offsetHeight + anchor.offsetHeight : 0)

            if (position === 'bottom') {
                target.style.left = anchorLeft + 'px'
                target.style.top = anchorBottom + 'px'
            } else if (position === 'left') {
                target.style.left = anchorLeft - target.offsetWidth + 'px'
                target.style.top = anchorTop + 'px'
            } else if (position === 'right') {
                target.style.left = anchorRight + 'px'
                target.style.top = anchorTop + 'px'
            } else if (position === 'top') {
                target.style.left = anchorLeft + 'px'
                target.style.top = anchorTop - target.offsetHeight + 'px'
            }
        }
    }
}