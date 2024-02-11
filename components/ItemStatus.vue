<script setup lang="ts">
const props = withDefaults(defineProps<{
    status: IRadioStatus
    hideRemove?: boolean
}>(), {
    hideRemove: false
})

defineEmits<{
    remove: [IRadioStatus]
}>()

const templateColumns = computed(() => {
    const columns = {
        imei: '10px',
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
        <span class="badge-color" :style="{ backgroundColor: status.color }"></span>

        {{ status.name }}

        <button v-if="!hideRemove" type="button" @click="$emit('remove', status)">
            <IconsTrashBin />
        </button>
    </div>
</template>

<style scoped>
.item-row {
    grid-template-columns: v-bind(templateColumns);
}
</style>