<script setup lang="ts">
const { code } = defineProps<{
    code: string
}>()

defineEmits(['close'])

const { data: model } = useFetch<IRadioModel>(`/api/radios-model/${code}`)
</script>

<template>
    <section class="mb-1">
        <div class="sk-card sk-card--flex-column">
            <div class="d-flex">
                <SkAvatar 
                    v-if="model"  
                    :alt="model.name"
                    :color="model.color" 
                    class="mr-1"
                />

                <h2>{{ model?.name }}</h2>
            </div>
        </div>
    </section>

    <TableRadios 
        :path="`/api/radios?radios_model[code][equal]=${code}&per_page=5`"
        hide-model
    />
</template>