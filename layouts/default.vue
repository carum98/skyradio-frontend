<template>
    <header>
    </header>
    <aside>
        <nav>
            <NuxtLink :to="{ name: 'index' }">Home</NuxtLink>
            <NuxtLink :to="{ name: 'companies' }">Companies</NuxtLink>
            <NuxtLink :to="{ name: 'radios' }">Radios</NuxtLink>
            <NuxtLink :to="{ name: 'modalities' }">Modalities</NuxtLink>
            <NuxtLink :to="{ name: 'sellers' }">Sellers</NuxtLink>
            <NuxtLink :to="{ name: 'sims' }">Sims</NuxtLink>
            <NuxtLink :to="{ name: 'sims-provider' }">Sims Provider</NuxtLink>
            <NuxtLink :to="{ name: 'radios-model' }">Radios Model</NuxtLink>
            <NuxtLink :to="{ name: 'radios-status' }">Radios Status</NuxtLink>
        </nav>
    </aside>
    <main>
        <slot />
    </main>
</template>