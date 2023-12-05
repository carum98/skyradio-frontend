<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const model = ref<IRadioModel | null>(null)

onMounted(async () => {
    model.value = await $fetch(`/api/radios-model/${props.code}`)
})
</script>

<template>
    <main style="width: 950px;">
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

        <Suspense>
            <TableRadios 
                :path="`/api/radios?radios_model[code][equal]=${props.code}&per_page=5`"
                hide-model
            />
        </Suspense>
    </main>
</template>