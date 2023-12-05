<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const provider = ref<ISimProvider | null>(null)

onMounted(async () => {
    provider.value = await $fetch(`/api/sims-provider/${props.code}`)
})
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

        <Suspense>
            <TableSims 
                :path="`/api/sims?sims_provider[code][equal]=${props.code}&per_page=5`"
                hide-provider
            />
        </Suspense>
    </main>
</template>