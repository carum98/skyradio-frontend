<script setup lang="ts">
useHead({
    titleTemplate: (title) => {
        return title ? `${title} | SkyRadio` : 'SkyRadio'
    }
})

const title = ref('')

onMounted(() => {
    const element = document.querySelector('title') as HTMLTitleElement

    const observer = new MutationObserver(() => {
        const text = element.innerText
        title.value = text.includes('|') ? text.split(' | ').at(0) ?? '' : ''
    })

    observer.observe(element, { childList: true })

    onUnmounted(() => {
        observer.disconnect()
    })
})
</script>

<template>
    <header>
        <h1>{{ title }}</h1>
        <Toolbar />
    </header>
    <aside>
        <img 
            src="/logo.avif" 
            alt="Logo" 
            width="65" 
            height="65"
        />
        <nav>
            <NuxtLink :to="{ name: 'clients' }">
                <span>
                    <IconsCompany />
                </span>
                Clientes
            </NuxtLink>
            <NuxtLink :to="{ name: 'radios' }">
                <span>
                    <IconsRadio />
                </span>
                Radios
            </NuxtLink>
            <NuxtLink :to="{ name: 'sims' }">
                <span>
                    <IconsSim />
                </span>
                SIMs
            </NuxtLink>
            <NuxtLink :to="{ name: 'apps' }">
                <span>
                    <IconsMobile />
                </span>
                Apps
            </NuxtLink>
            <NuxtLink :to="{ name: 'reports' }">
                <span>
                    <IconsReport />
                </span>
                Reportes
            </NuxtLink>

            <NuxtLink :to="{ name: 'settings' }" aria-label="settings">
                <span>
                    <IconsSettings />
                </span>
            </NuxtLink>
        </nav>
    </aside>
    
    <slot />
</template>