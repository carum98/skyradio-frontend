<template>
    <header>
    </header>
    <aside>
        <nav>
            <NuxtLink :to="{ name: 'index' }">
                <span>
                    <IconsHome />
                </span>
                Menu
            </NuxtLink>
            <NuxtLink :to="{ name: 'companies' }">
                <span>
                    <IconsCompany />
                </span>
                Compañias
            </NuxtLink>
            <NuxtLink :to="{ name: 'radios' }">
                <span>
                    <IconsRadio />
                </span>
                Radios
            </NuxtLink>
            <!-- <NuxtLink :to="{ name: 'modalities' }">Modalities</NuxtLink> -->
            <!-- <NuxtLink :to="{ name: 'sellers' }">Sellers</NuxtLink> -->
            <NuxtLink :to="{ name: 'sims' }">
                <span>
                    <IconsSim />
                </span>
                Sims
            </NuxtLink>
            <!-- <NuxtLink :to="{ name: 'sims-provider' }">Sims Provider</NuxtLink> -->
            <!-- <NuxtLink :to="{ name: 'radios-model' }">Radios Model</NuxtLink> -->
            <!-- <NuxtLink :to="{ name: 'radios-status' }">Radios Status</NuxtLink> -->
            <NuxtLink :to="{ name: 'settings' }">
                <span>
                    <IconsSettings />
                </span>
            </NuxtLink>
        </nav>
    </aside>
    
    <slot />
</template>