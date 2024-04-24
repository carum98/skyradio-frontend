<script setup lang="ts">
useHead({
  title: 'Reportes',
})

type IReport = {
    key: string
    title: string
    description: string
    action: Function
    show?: boolean
}

const dialog = useDialogs()
const toast = useToast()
const { isSeller } = useRole()

// data
const reportKey = ref<string | null>(null)

// computed
const loading = computed(() => reportKey.value !== null)

// Static
const reports: IReport[] = [
    {
        key: 'inventory',
        title: 'Inventario',
        description: 'Reporte de inventario, muestra un listado de los radios y sims disponibles en inventario',
        action: function () {
            generate('/api/reports/inventory', this)
        },
        show: !isSeller
    },
    {
        key: 'general',
        title: 'General',
        description: 'Reporte con toda la información de radios, sims y apps que estan activas en clientes',
        action: function () {
            generate('/api/reports/general', this)
        }
    },
    {
        key: 'clients',
        title: 'Cliente',
        description: 'Reporte por cliente, muestra un listado los radios del cliente.',
        action: () => dialog.push({
            name: 'reports-clients'
        })
    },
    {
        key: 'seller',
        title: 'Vendedor',
        description: 'Reporte por vendedor, muestra los clientes del vendedor.',
        action: () => dialog.push({
            name: 'reports-seller'
        }),
        show: !isSeller
    },
    {
        key: 'model',
        title: 'Modelo',
        description: 'Reporte por modelo, muestra un listado de radios por modelo.',
        action: () => dialog.push({
            name: 'reports-model'
        })
    },
    {
        key: 'provider',
        title: 'Proveedores de SIMs',
        description: 'Reporte por proveedor de SIMs, listado de sims por proveedor.',
        action: () => dialog.push({
            name: 'reports-provider'
        })
    }
]

// methods
async function generate(path: string, report: IReport) {
    try {
        reportKey.value = report.key

        const data = await $fetch(path, {
            method: 'POST'
        })

        dowloadFile({
            data,
            name: `skyradio-report-${Date.now()}.xlsx`
        })

        toast.open({
            title: 'Éxito',
            message: 'Reporte generado correctamente',
            type: 'success'
        })
    } catch (error) {
        toast.open({
            title: 'Error',
            message: 'Ocurrió un error al generar el reporte',
            type: 'error'
        })
    } finally {
        reportKey.value = null
    }
}
</script>

<template>
    <main>
        <section class="reports">
            <article v-for="item in reports.filter(item => item?.show ?? true)">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>

                <button 
                    class="sk-button sk-button--icon" 
                    @click="item.action.call(item)" 
                    :disabled="loading"
                >
                    <template v-if="loading && reportKey === item.key">
                        <IconsLoadingAnimated />
                        Generando...
                    </template>
                    <template v-else>
                        <IconsReport />
                        Generar
                    </template>
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