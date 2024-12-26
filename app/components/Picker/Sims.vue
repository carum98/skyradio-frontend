<script setup lang="ts">
defineProps<{
    path: string
    radio: ISim | null
}>()

const emits = defineEmits<{
    selected: [ISim]
    close: []
}>()

// methods
function onSelect(item: ISim) {
    emits('selected', item)
    emits('close')
}
</script>

<template>
    <Picker
        :path="path"
        :value="radio"
        @selected="onSelect"
    >
        <template #option="{ item }">
            {{ item.number }}

            <span class="sk-link">
                <span class="badge-color" :style="{ backgroundColor: item.provider.color }"></span>
                {{ item.provider.name }}
            </span>
        </template>
    </Picker>
</template>