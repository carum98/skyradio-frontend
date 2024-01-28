export default defineNuxtPlugin(() => {
    const routerModal = useRouterModal()

    return {
        provide: {
            routerModal
        }
    }
})
  