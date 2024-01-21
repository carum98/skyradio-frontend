<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const { data: provider } = await useFetch<ISimProvider>(`/api/sims-provider/${props.code}`)
</script>

<template>
    <main style="width: 800px;">
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
    </main>
</template>