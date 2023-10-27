<template>
    <header>
        <h1>SkyRadio</h1>
        <nav>
            <NuxtLink :to="{ name: 'index' }">Home</NuxtLink>
            <NuxtLink :to="{ name: 'companies' }">Companies</NuxtLink>
            <NuxtLink :to="{ name: 'radios' }">Radios</NuxtLink>
            <NuxtLink :to="{ name: 'modalities' }">Modalities</NuxtLink>
        </nav>
    </header>
    <main>
        <slot />
    </main>
</template>