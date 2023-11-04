<template>
    <header>
        <UserInfo />
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
                Sims
            </NuxtLink>
            <NuxtLink :to="{ name: 'settings' }">
                <span>
                    <IconsSettings />
                </span>
            </NuxtLink>
        </nav>
    </aside>
    
    <slot />
</template>