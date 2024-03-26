<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
    client: IClient
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

// data
const apps = ref<IAppForm[]>([])

// computed
const disabled = computed(() => !apps.value.length)

// methods
async function send() {
    try {
        await Promise.allSettled(apps.value.map(app => 
            $fetch(`/api/clients/${props.client.code}/apps`, {
                method: 'POST',
                body: {
                    name: app.name,
                    license_code: app.license?.code
                }
            })
        ))

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'Apps creadas correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al crear las apps'
        })
    }
}

function addApp() {
    apps.value.push({
        name: '',
        license: null
    })
}

function removeApp(app: IAppForm) {
    apps.value.splice(apps.value.indexOf(app), 1)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <ul v-if="apps.length" class="d-flex-column gap-1 mb-1">
            <li v-for="app in apps">
                <ItemApp
                    :app="app"
                    @remove="removeApp"
                />
            </li>
        </ul>

        <button class="button-picker" @click.prevent="addApp">
            Nueva App
        </button>

        <button type="submit" class="sk-button sk-button--block" :disabled="disabled">
            Aceptar
        </button>
    </form>
</template>