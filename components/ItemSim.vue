<script setup lang="ts">
const props = withDefaults(defineProps<{
    sim: ISim
    hideRemove?: boolean
}>(), {
    hideRemove: false
})

defineEmits<{
    remove: [ISim]
}>()

const templateColumns = computed(() => {
    const columns = {
        imei: '1fr',
        provider: 'auto',
        remove: '35px'
    } as Record<string, string>

    if (props.hideRemove) {
        delete columns.remove
    }

    return Object.values(columns).join(' ')
})
</script>

<template>
    <div class="item-row">
        {{ sim.number }}

        <span class="sk-link">
            <span class="badge-color" :style="{ backgroundColor: sim.provider.color }"></span>
            {{ sim.provider.name }}
        </span>

        <button v-if="!hideRemove" type="button" @click="$emit('remove', sim)">
            <IconsTrashBin />
        </button>
    </div>
</template>

<style scoped>
.item-row {
    grid-template-columns: v-bind(templateColumns);
}
</style>