<script setup lang="ts">
useHead({
  title: 'Reportes',
})

type Report = {
    title: string
    description: string
    action: ProgrammaticallyReturnType
}

const reports = [
    {
        title: 'Cliente',
        description: 'Reporte por cliente, muestra un listado los radios del cliente.',
        action: useModal({
            component: () => import('@views/report-client.vue'),
            rootProps: {
                width: 315
            }
        })
    },
    {
        title: 'Vendedor',
        description: 'Reporte por vendedor, muestra los clientes del vendedor.',
        action: useModal({
            component: () => import('@views/report-seller.vue'),
            rootProps: {
                width: 315
            }
        })
    },
    {
        title: 'Modelo',
        description: 'Reporte por modelo, muestra un listado de radios por modelo.',
        action: useModal({
            component: () => import('@views/report-model.vue'),
            rootProps: {
                width: 315
            }
        })
    },
    {
        title: 'Proveedores de SIMs',
        description: 'Reporte por proveedor de SIMs, listado de sims por proveedor.',
        action: useModal({
            component: () => import('@views/report-provider.vue'),
            rootProps: {
                width: 315
            }
        })
    },
    {
        title: 'Inventario',
        description: 'Reporte de inventario, muestra un listado de los radios en inventario.',
        action: useModal({
            component: () => import('@views/report-inventory.vue'),
            rootProps: {
                width: 315
            }
        })
    }
] as Report[]

// methods
function openReport(item: Report) {
    item.action.open({})
}
</script>

<template>
    <main>
        <h1>Reportes</h1>
        <section class="reports">
            <article v-for="item in reports">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>

                <button @click="openReport(item)">
                    <IconsReport />
                    Generar
                </button>
            </article>
        </section>
    </main>
</template>

<style>
.reports {
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 1rem;

    & article {
        padding: 20px;
        border-radius: 15px;
        background-color: var(--table-color);

        & p {
            color: gray;
            margin-bottom: 20px;
        }

        & button {
            float: right;
            background-color: var(--primary-color);
            color: white;
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 10px;

            & svg {
                width: 25px;
                height: 25px;
            }
        }
    }
}
</style>