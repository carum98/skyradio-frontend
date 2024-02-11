<script setup lang="ts">
defineProps<{
    path: string
    value: IRadioStatus | null
}>()

const emits = defineEmits<{
    selected: [IRadioStatus]
    close: []
}>()

// methods
function onSelect(item: IRadioStatus) {
    emits('selected', item)
    emits('close')
}
</script>

<template>
    <Picker
        path="/api/radios-status"
        :value="value"
        @selected="onSelect"
    >
        <template #option="{ item }">
            <div>
                <span class="badge-color mr-1" :style="{ backgroundColor: item.color }"></span>
                {{ item.name }}
            </div>  
        </template>
    </Picker>
</template>