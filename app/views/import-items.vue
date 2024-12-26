<script lang="ts" setup>
const toast = useToast()

const props = defineProps<{
    instance: string
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

// data
const file = ref<File | null>(null)
const downloading = ref(false)
const sending = ref(false)

// computed
const isFileSelected = computed(() => file.value !== null)
const isDisabled = computed(() => downloading.value || sending.value || !isFileSelected.value)

// methods
function selectFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xlsx'
    input.onchange = (event) => {
        const target = event.target as HTMLInputElement
        file.value = target.files?.[0] || null
    }
    input.click()
    input.remove()
}

async function downloadTemplate() {
    try {
        downloading.value = true

        const response = await $fetch(`/api/templates/${props.instance}`, {
            method: 'GET',
            responseType: 'blob'
        })

        const a = document.createElement('a')
        a.href = URL.createObjectURL(response)
        a.download = `plantilla-${props.instance}.xlsx`
        a.click()
        a.remove()

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'Plantilla descargada correctamente'
        })
    } catch (error) {
        console.error(error)

        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al descargar la plantilla'
        })
    } finally {
        downloading.value = false
    }
}

async function onSubmitted() {
    try {
        sending.value = true
        const formData = new FormData()
        formData.append('file', file.value as File)

        await $fetch(`/api/${props.instance}/imports`, {
            method: 'POST',
            body: formData
        })

        toast.open({
            type: 'success',
            title: 'Exito!!',
            message: 'Elementos importados correctamente'
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            type: 'error',
            title: 'Error!!',
            message: 'Ocurrio un error al importar'
        })
    } finally {
        sending.value = false
    }
}
</script>

<template>
    <form @submit.prevent="onSubmitted">
        <div v-if="isFileSelected" class="item-row">
            <span>{{ file?.name || 'file-name' }}</span>
        </div>
        <button v-else type="button" class="button-picker" @click="selectFile">
            Seleccionar archivo
        </button>

        <div class="d-flex justify-content-between align-items-center mt-1">
            <button type="button" class="d-flex" style="color: gray" @click="downloadTemplate" :disabled="downloading">
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V8zm-2 17l-4-4h2.5v-3h3v3H16zm1-10V3.5L18.5 9z"/></svg>
                Descargar plantilla
            </button>

            <button type="submit" class="sk-button" :disabled="isDisabled">
                Importar
            </button>
        </div>
    </form>
</template>
