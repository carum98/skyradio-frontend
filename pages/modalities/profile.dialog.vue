<script setup lang="ts">
const { code } = defineProps<{
    code: string
}>()

defineEmits(['close'])

const { data: modality } = useFetch<IModality>(`/api/clients-modality/${code}`)
</script>

<template>
    <section class="mb-1">
        <div class="sk-card sk-card--flex-column">
            <div class="d-flex">
                <SkAvatar 
                    v-if="modality"  
                    :alt="modality.name"
                    :color="modality.color" 
                    class="mr-1"
                />

                <h2>{{ modality?.name }}</h2>
            </div>
        </div>
    </section>

    <TableClients 
        :path="`/api/clients?clients_modality[code][equal]=${code}&per_page=5`"
        hide-modality
    />
</template>