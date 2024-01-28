export default function(event: ToggleEvent, position: 'top' | 'bottom' | 'left' | 'right' = 'bottom') {
    const target = event.target as HTMLElement

    const anchorId = target.attributes.getNamedItem('anchor')

    if (anchorId) {
        const anchor = document.getElementById(anchorId.value)

        if (anchor) {
            const anchorPosition = anchor.getBoundingClientRect()

            const overflowRight = anchorPosition.right + target.offsetWidth > window.innerWidth

            const anchorBottom = anchorPosition.bottom + window.pageYOffset
            const anchorLeft = anchorPosition.left + (overflowRight ? window.pageXOffset - target.offsetWidth + anchor.offsetWidth : 0)
            const anchorRight = anchorPosition.right + (overflowRight ? window.pageXOffset - target.offsetWidth + anchor.offsetWidth : 0)
            const anchorTop = anchorPosition.top + window.pageYOffset

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