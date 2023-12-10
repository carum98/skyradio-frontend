<script setup lang="ts">
const emits = defineEmits<{
    close: []
}>()

// data
const model = ref<IRadioModel | null>(null)
const format = ref('xlsx')
const loading = ref(false)

// methods
async function send() {
    loading.value = true

    const data = await $fetch(`/api/reports/models`, {
        method: 'POST',
        body: {
            model_code: model.value?.code,
            format: format.value
        }
    })

    dowloadFile({
        data,
        name: `${model.value?.name}.${format.value}`
    })

    loading.value = false

    emits('close')
}

</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <SelectRadioModel
            v-model="model"
        />

        <PickerFormat 
            style="margin-top: 1rem;"
            v-model="format" 
            :disabled="loading"
            dense
        />

        <button type="submit" class="sk-button sk-button--icon" :disabled="loading">
            <IconsLoadingAnimated v-if="loading" />
            {{ loading ? 'Generando...' : 'Generar' }}
        </button>
    </form>
</template>