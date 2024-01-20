<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const { data: status } = useFetch<IRadioStatus>(`/api/radios-status/${props.code}`)
</script>

<template>
    <main style="width: 950px;">
        <section class="mb-1">
            <div class="sk-card sk-card--flex-column">
                <div class="d-flex">
                    <SkAvatar 
                        v-if="status"  
                        :alt="status.name"
                        :color="status.color" 
                        class="mr-1"
                    />

                    <h2>{{ status?.name }}</h2>
                </div>
            </div>
        </section>

        <Suspense>
            <TableRadios 
                :path="`/api/radios?radios_status[code][equal]=${code}&per_page=5`"
            />
        </Suspense>
    </main>
</template>