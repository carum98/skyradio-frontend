<template>
    <main>
        <section>
            <p>Clientes</p>
            <NuxtLink :to="{ name: 'modalities' }">
                Modalidades
            </NuxtLink>
            <NuxtLink :to="{ name: 'sellers' }">
                Vendedores
            </NuxtLink>

            <p>Sims</p>
            <NuxtLink :to="{ name: 'sims-provider' }">
                Provedores
            </NuxtLink>

            <p>Radios</p>
            <NuxtLink :to="{ name: 'radios-model' }">
                Modelos
            </NuxtLink>
            <NuxtLink :to="{ name: 'radios-status' }">
                Estados
            </NuxtLink>
        </section>

        <NuxtPage />
    </main>
</template>

<style scoped>
    main {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 25px;

        & section {
            padding: 20px;
            border-radius: 15px;
            background-color: var(--table-color);
        }

        & a {
            display: block;
            text-decoration: none;
            background-color: var(--background-color);
            color: var(--text-color);
            padding: 10px 20px;
            border-radius: 15px;
            margin-bottom: 15px;
            transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;

            &:hover, &.link-active {
                background-color: var(--primary-color);
                box-shadow: var(--shadow);
                color: #fff;
            }
        }

        & p {
            margin-bottom: 5px;
            margin-left: 5px;
            color: gray;
        }
    }
</style>