<script setup lang="ts">
const { code } = defineProps<{
    code: string
}>()

defineEmits(['close'])

const { data: provider } = await useFetch<ISimProvider>(`/api/sims-provider/${code}`)
</script>

<template>
    <section class="mb-1">
        <div class="sk-card sk-card--flex-column">
            <div class="d-flex">
                <SkAvatar 
                    v-if="provider"  
                    :alt="provider.name"
                    :color="provider.color" 
                    class="mr-1"
                />

                <h2>{{ provider?.name }}</h2>
            </div>
        </div>
    </section>

    <TableSims 
        :path="`/api/sims?sims_provider[code][equal]=${code}&per_page=5`"
        hide-provider
    />
</template>