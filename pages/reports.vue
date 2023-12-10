<script setup lang="ts">
const reports = [
    {
        title: 'Cliente',
        description: 'Reporte por cliente, muestra un listado los radios del cliente'
    },
    {
        title: 'Vendedor',
        description: 'Reporte por vendedor, muestra los clientes del vendedor'
    },
    {
        title: 'Radios',
        description: 'Reporte por radio, muestra la informacion de la radio'
    },
    {
        title: 'Proveedores de SIMs',
        description: 'Reporte por proveedor de SIMs, listado de sims por proveedor'
    }
]
</script>

<template>
    <main>
        <h1>Reportes</h1>
        <section class="reports">
            <article v-for="item in reports">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>

                <button>
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
        }

        & button {
            float: right;
            background-color: var(--primary-color);
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