export default defineNuxtPlugin(() => {
    const height = useCookie('height', {
        watch: true,
    })

    height.value = window.innerHeight.toString()
})