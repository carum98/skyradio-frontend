<script setup lang="ts">
const { code } = defineProps<{
    code: string
}>()

defineEmits(['close'])

const { data: status } = useFetch<IRadioStatus>(`/api/radios-status/${code}`)
</script>

<template>
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

    <TableRadios 
        :path="`/api/radios?radios_status[code][equal]=${code}&per_page=5`"
        hide-client
        hide-sim
        hide-provider
    />
</template>