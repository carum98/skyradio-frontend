<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const { data: modality } = useFetch<IModality>(`/api/clients-modality/${props.code}`)
</script>

<template>
    <main>
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
    </main>
</template>